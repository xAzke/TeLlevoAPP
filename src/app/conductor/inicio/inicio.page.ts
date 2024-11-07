import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IconsModule } from "../../icons.module";
import { StorageService } from "../../services/storage.service";
import { UserService } from "src/app/services/user.service";
import { NotificationsService } from "src/app/services/notifications.service";

interface Viaje {
    vehiculo: string;
    patente: string;
    capacidad: number;
    costo: number;
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
    travelList: Viaje[] = [];

    constructor(
        private storageService: StorageService,
        private userService: UserService,
        private notificationService: NotificationsService
    ) {}

    async ngOnInit() {}

    async listarViajes() {
        this.travelList = await this.storageService.getAllItemsByUser(
            "viajes",
            this.userService.getUserName()
        );

        this.notificationService.showToast("Listando viajes...", "info");
    }

    async eliminarViaje(identificador: string) {
        await this.storageService.deleteItem("viajes", identificador);
        this.listarViajes();

        this.notificationService.showToast(
            "Viaje cancelado correctamente",
            "info"
        );
    }
}
