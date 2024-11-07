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
import { StorageService } from "../../services/storage.service";
import { UserService } from "src/app/services/user.service";
import { MapaService } from "src/app/services/mapa.service";
import { IonSearchbar } from "@ionic/angular";
import { NotificationsService } from "src/app/services/notifications.service";

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
        private storageService: StorageService,
        private userService: UserService,
        private mapService: MapaService,
        private notificationService: NotificationsService
    ) {
        this.travelForm = this.fb.group({
            vehiculo: ["", [Validators.required]],
            patente: ["", [Validators.required]],
            capacidad: [
                "",
                [Validators.required, Validators.pattern("^[0-9]+$")],
            ],
            costo: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
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
        if (this.savedLocation) {
            this.notificationService.showToast(
                "Ubicación guardada correctamente",
                "success"
            );
        } else {
            this.notificationService.showToast(
                "Selecciona una ubicación",
                "warning"
            );
        }
    }

    limpiarBusquedaMapa() {
        this.mapService.clearRoute();
    }

    async searchDirection() {
        const searchInput = await this.searchBar.getInputElement();

        if (searchInput) {
            this.mapService.searchDirection(searchInput);
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

            this.notificationService.showToast("Viaje Creado", "success");
        } else {
            this.notificationService.showToast(
                "Selecciona una ubicación",
                "warning"
            );
        }
    }
}
