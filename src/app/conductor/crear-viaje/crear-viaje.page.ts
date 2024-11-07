import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    FormsModule,
    FormGroup,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
} from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IconsModule } from "../../icons.module";
import { StorageService } from "../../storage.service";
import { Router, RouterModule } from "@angular/router";
import { UserService } from "src/app/user.service";

@Component({
    selector: "app-crear-viaje",
    templateUrl: "./crear-viaje.page.html",
    styleUrls: ["./crear-viaje.page.scss"],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
    ],
})
export class CrearViajePage implements OnInit {
    travelForm!: FormGroup;

    userName: string = "";

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private storageService: StorageService,
        private userService: UserService
    ) {
        this.travelForm = this.fb.group({
            vehiculo: ["", [Validators.required]],
            patente: ["", [Validators.required]],
            capacidad: ["", [Validators.required]],
            costo: ["", [Validators.required]],
            destino: ["", [Validators.required]],
        });
    }

    ngOnInit() {
        console.log(this.userService.getUserName());
        console.log(this.userService.getUserName());
    }

    ngAfterViewInit() {}

    addNewTravel() {
        const newTravel = {
            vehiculo: this.travelForm.get("vehiculo")?.value,
            patente: this.travelForm.get("patente")?.value,
            capacidad: this.travelForm.get("capacidad")?.value,
            costo: this.travelForm.get("costo")?.value,
            usuario: this.userService.getUserName(),
            identificador: Math.floor(Math.random() * 1000),
            asientos_ocupados: 0,
            destino: this.travelForm.get("destino")?.value,
        };

        this.storageService.setItem("viajes", newTravel);
    }
}
