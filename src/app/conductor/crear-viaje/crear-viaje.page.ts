import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
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
import { MapaService } from "src/app/mapa.service";
import { IonSearchbar } from "@ionic/angular";

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
    @ViewChild("mapElement", { static: true }) mapElement!: ElementRef;
    @ViewChild("searchBar", { static: false }) searchBar!: IonSearchbar;

    travelForm!: FormGroup;
    userName: string = "";
    savedLocation: any;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private storageService: StorageService,
        private userService: UserService,
        private mapService: MapaService
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
        this.mapService.drawMap(this.mapElement.nativeElement, {
            lat: -33.60511640177368,
            lng: -70.56124927637602,
        });
    }

    ngAfterViewInit() {
        this.searchDirection();
    }

    iniciarBusquedaMapa() {
        this.mapService.calculateRoute();
    }

    guardarBusquedaMapa() {
        this.savedLocation = this.mapService.getMapLocation();
        alert("Ubicación guardada");

        console.log(this.savedLocation);
    }

    async searchDirection() {
        const searchInput = await this.searchBar.getInputElement();
        console.log(searchInput);

        if (searchInput) {
            this.mapService.searchDirection(searchInput);
            console.log("searchDirection");
        }
    }

    addNewTravel() {
        if (this.savedLocation) {
            const newTravel = {
                vehiculo: this.travelForm.get("vehiculo")?.value,
                patente: this.travelForm.get("patente")?.value,
                capacidad: this.travelForm.get("capacidad")?.value,
                costo: this.travelForm.get("costo")?.value,
                usuario: this.userService.getUserName(),
                identificador: Math.floor(Math.random() * 1000),
                asientos_ocupados: 0,
                destino_nombre: this.savedLocation.pointName,
                destino_coords: this.savedLocation,
            };

            this.storageService.setItem("viajes", newTravel);
        } else {
            console.log("No se ha seleccionado un destino");
        }
    }
}
