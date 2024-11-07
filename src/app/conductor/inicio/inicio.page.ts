import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IconsModule } from "../../icons.module";
import { StorageService } from "../../storage.service";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "src/app/user.service";

interface Viaje {
    vehiculo: string;
    patente: string;
    capacidad: number;
    costo: number;
    inicio: string;
    fin: string;
    usuario: string;
    identificador: string;
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
        private userService: UserService
    ) {}

    async ngOnInit() {}

    async listarViajes() {
        this.travelList = await this.storageService.getAllItemsByUser(
            "viajes",
            this.userService.getUserName()
        );
    }

    async eliminarViaje(identificador: string) {
        await this.storageService.deleteItem("viajes", identificador);
        this.listarViajes();
    }
}
