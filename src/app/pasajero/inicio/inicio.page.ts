import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { IconsModule } from "../../icons.module";
import { UserService } from "../../services/user.service";
import { StorageService } from "src/app/services/storage.service";
import { MapaService } from "src/app/services/mapa.service";
import { NotificationsService } from "src/app/services/notifications.service";

interface Viaje {
    vehiculo: string;
    patente: string;
    capacidad: number;
    costo: number;
    inicio: string;
    fin: string;
    usuario: string;
    identificador: string;
    asientos_ocupados: number;
    destino_nombre: string;
}

@Component({
    selector: "app-inicio",
    templateUrl: "./inicio.page.html",
    styleUrls: ["./inicio.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, IconsModule],
})
export class InicioPage implements OnInit {
    @ViewChild("mapElementUser") mapElementUser: ElementRef | undefined;

    travelList: Viaje[] = [];
    travelId: string = "";
    isModalOpen = false;

    constructor(
        private userService: UserService,
        private storageService: StorageService,
        private mapService: MapaService,
        private notificationService: NotificationsService
    ) {}

    ngOnInit() {}

    async listarViajes() {
        const allViajes = await this.storageService.getAllItems("viajes");
        this.travelList = allViajes.filter(
            (viaje: Viaje) => viaje.asientos_ocupados < viaje.capacidad
        );

        this.notificationService.showToast(
            "Listando viajes disponibles...",
            "info"
        );

        if (this.travelList.length <= 0) {
            this.notificationService.showToast(
                "No hay viajes disponibles...",
                "warning"
            );
        }
    }

    async reservarViaje(identificador: string) {
        const viaje = this.travelList.find(
            (v) => v.identificador === identificador
        );
        if (viaje && viaje.asientos_ocupados < viaje.capacidad) {
            viaje.asientos_ocupados += 1;
            await this.storageService.updateItem("viajes", viaje);

            this.notificationService.showInfo(
                "Viaje Reservado",
                `Destino: ${viaje.destino_nombre}\nCosto: $${viaje.costo}`,
                "success"
            );

            const viajeReservado = {
                ...viaje,
                usuario_reserva: this.userService.getUserName(),
                asientos_ocupados: viaje.asientos_ocupados,
            };

            await this.storageService.setItem(
                "viajes_reservados",
                viajeReservado
            );
        } else {
            this.notificationService.showInfo(
                "Error al reservar",
                "No hay asientos disponibles",
                "warning"
            );
        }
    }

    setModalState(state: boolean) {
        this.isModalOpen = state;
    }

    async onModalPresent() {
        if (this.mapElementUser) {
            this.mapService.drawMap(this.mapElementUser.nativeElement, {
                lat: -33.60511640177368,
                lng: -70.56124927637602,
            });

            const travelData = await this.storageService.getItemById(
                "viajes",
                this.travelId
            );

            this.mapService.calculateManualRoute(
                travelData["destino_coords"].startPoint,
                travelData["destino_coords"].finishPoint
            );
        } else {
            console.log("¡No se logro cargar el mapa dentro del modal!");
        }
    }

    async mostrarRutaViaje(identificador: string) {
        this.setModalState(true);
        this.travelId = identificador;
    }
}
