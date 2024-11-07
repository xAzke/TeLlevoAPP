import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { IconsModule } from "../../icons.module";
import { UserService } from "../../user.service";
import { StorageService } from "src/app/storage.service";

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
    destino: string;
}

@Component({
    selector: "app-inicio",
    templateUrl: "./inicio.page.html",
    styleUrls: ["./inicio.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, IconsModule],
})
export class InicioPage implements OnInit {
    travelList: Viaje[] = [];

    constructor(
        private router: Router,
        private userService: UserService,
        private storageService: StorageService
    ) {}

    ngOnInit() {}

    async ngAfterViewInit() {
        console.log("ViajesPage: ngAfterViewInit");
    }

    async listarViajes() {
        this.travelList = await this.storageService.getAllItems("viajes");
        console.log(this.travelList);
    }

    async reservarViaje(identificador: string) {
        const viaje = this.travelList.find(
            (v) => v.identificador === identificador
        );
        if (viaje && viaje.asientos_ocupados < viaje.capacidad) {
            viaje.asientos_ocupados += 1;
            await this.storageService.updateItem("viajes", viaje);
            console.log(
                `Viaje reservado: ${identificador}, asientos restantes: ${viaje.capacidad}`
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
            console.log(
                `No hay asientos disponibles para el viaje: ${identificador}`
            );
        }
    }
}
