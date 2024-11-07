import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IconsModule } from "../../icons.module";
import { StorageService } from "src/app/services/storage.service";
import { UserService } from "src/app/services/user.service";
import { NotificationsService } from "src/app/services/notifications.service";

interface ViajesReservados {
    vehiculo: string;
    patente: string;
    capacidad: number;
    costo: number;
    inicio: string;
    fin: string;
    usuario: string;
    identificador: string;
    asientos_ocupados: number;
    destino: string;
}

@Component({
    selector: "app-viajes",
    templateUrl: "./viajes.page.html",
    styleUrls: ["./viajes.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, IconsModule],
})
export class ViajesPage implements OnInit {
    travelList: ViajesReservados[] = [];

    constructor(
        private storageService: StorageService,
        private userService: UserService,
        private notificationService: NotificationsService
    ) {}

    ngOnInit() {}

    async listarViajesReservados() {
        this.travelList = await this.storageService.getAllTravelsByUsuario(
            "viajes_reservados",
            this.userService.getUserName()
        );

        this.notificationService.showToast(
            "Listando viajes reservados...",
            "info"
        );
    }

    async cancelarReserva(identificador: string) {
        await this.storageService.deleteItem(
            "viajes_reservados",
            identificador
        );
        const viaje = (await this.storageService.getAllItems("viajes")).find(
            (v) => v.identificador === identificador
        );
        if (viaje) {
            viaje.asientos_ocupados -= 1;
            if (viaje.asientos_ocupados < 0) {
                viaje.asientos_ocupados = 0;
            }

            await this.storageService.updateItem("viajes", viaje);
        }
        await this.listarViajesReservados();
        this.notificationService.showToast(
            "Reserva cancelada correctamente",
            "info"
        );
    }
}
