import { Injectable } from "@angular/core";
import { NotificationsService } from "./notifications.service";

declare var google: any;

@Injectable({
    providedIn: "root",
})
export class MapaService {
    localMap: any;
    localMarker: any;

    startPoint: any;
    searchedLocation: any;

    directionServices: any;
    directionRenderer: any;

    constructor(private notificationService: NotificationsService) {}

    drawMap(mapElement: HTMLElement, startPoint: { lat: number; lng: number }) {
        if (mapElement) {
            this.localMap = new google.maps.Map(mapElement, {
                center: startPoint,
                zoom: 15,
                disableDefaultUI: true,
            });
        }

        this.localMarker = new google.maps.Marker({
            position: startPoint,
            map: this.localMap,
        });

        this.startPoint = startPoint;

        this.directionServices = new google.maps.DirectionsService();
        this.directionRenderer = new google.maps.DirectionsRenderer();
        this.directionRenderer.setMap(this.localMap);

        // VARIABLES PARA LEER LA CAJA DE INSTRUCCIONES
        var routeBox =
            (document.getElementById("trayecto") as HTMLInputElement) || null;
        this.directionRenderer.setPanel(routeBox);
    }

    async searchDirection(searchInput: any) {
        if (searchInput) {
            const Autocomplete = new google.maps.places.Autocomplete(
                searchInput
            );

            this.searchedLocation = Autocomplete;

            Autocomplete.addListener("place_changed", () => {
                const place = Autocomplete.getPlace();
                if (!place || !place.geometry) {
                    return;
                }
                const location = place.geometry.location;

                this.localMap.setCenter(location);
                this.localMap.setZoom(13);

                this.localMarker.setPosition(location);
            });
        } else {
            console.log("La barra de busqueda no fue encontrada");
        }
    }

    calculateRoute() {
        const startLocation = this.startPoint;
        const place = this.searchedLocation?.getPlace();
        if (!place || !place.geometry) {
            this.notificationService.showToast(
                "No se pudo obtener la ubicación de destino.",
                "warning"
            );
            return;
        }
        const finishLocation = place.geometry.location;

        const mapRequest = {
            origin: startLocation,
            destination: finishLocation,
            travelMode: google.maps.TravelMode.DRIVING,
        };
        this.directionServices.route(
            mapRequest,
            (routeResult: any, routeStatus: any) => {
                if (routeStatus === google.maps.DirectionsStatus.OK) {
                    this.directionRenderer.setDirections(routeResult);
                } else {
                    this.notificationService.showToast(
                        "No fue posible calcular la ruta a esta dirección.",
                        "warning"
                    );
                }

                this.localMarker.setPosition(null);
            }
        );
    }

    calculateManualRoute(
        startLocation: { lat: number; lng: number },
        finishLocation: { lat: number; lng: number }
    ) {
        const startPoint = startLocation;
        const finishPoint = finishLocation;

        const mapRequest = {
            origin: startPoint,
            destination: finishPoint,
            travelMode: google.maps.TravelMode.DRIVING,
        };
        this.directionServices.route(
            mapRequest,
            (routeResult: any, routeStatus: any) => {
                if (routeStatus === google.maps.DirectionsStatus.OK) {
                    this.directionRenderer.setDirections(routeResult);
                } else {
                    this.notificationService.showToast(
                        "No fue posible calcular la ruta a esta dirección.",
                        "warning"
                    );
                }

                this.localMarker.setPosition(null);
            }
        );
    }

    getMapLocation() {
        const place = this.searchedLocation?.getPlace();
        if (place && place.geometry) {
            return {
                startPoint: this.startPoint,
                finishPoint: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                },
                pointName: place.name,
            };
        }
        return null;
    }

    clearRoute() {
        this.directionRenderer.setDirections({ routes: [] });
        this.localMarker.setPosition(this.startPoint);
        if (this.searchedLocation) {
            this.searchedLocation.set("place", null);
        }

        this.notificationService.showToast(
            "Mapa limpiado correctamente",
            "info"
        );
    }
}
