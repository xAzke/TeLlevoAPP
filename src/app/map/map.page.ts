import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

// API KEY GOOGLE MAPS
// AIzaSyC9i2S9SKxBwLmGYtnVuYvBwyiC0aCnOFg

declare var google: any;

@Component({
	selector: "app-map",
	templateUrl: "./map.page.html",
	styleUrls: ["./map.page.scss"],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule],
})
export class MapPage implements OnInit {
	localMap: any;
	localMarker: any;
	
	startPoint = {lat: -33.60511640177368, lng: -70.56124927637602}
	searchedLocation: any;

	directionServices: any;
	directionRenderer: any;

	constructor() { }
	ngOnInit() {
		this.drawMap()
		this.searchDirection(this.localMap, this.localMarker)
	}

	drawMap() {
		var mapElement = document.getElementById("map")
		if (mapElement) {
			this.localMap = new google.maps.Map(mapElement, {center: this.startPoint, zoom: 15})
		}

		this.localMarker = new google.maps.Marker({position: this.startPoint, map: this.localMap})

		this.directionServices = new google.maps.DirectionsService()
		this.directionRenderer = new google.maps.DirectionsRenderer()
		this.directionRenderer.setMap(this.localMap)

		// VARIABLES PARA LEER LA CAJA DE INSTRUCCIONES
		var routeBox = document.getElementById("trayecto") as HTMLInputElement || null
		this.directionRenderer.setPanel(routeBox)
	}

	searchDirection(localMap: any, localMarker: any) {
		var searchInput = document.getElementById("autocomplete")
		if (searchInput) {
			const Autocomplete = new google.maps.places.Autocomplete(searchInput)
			this.searchedLocation = Autocomplete

			Autocomplete.addListener("place_changed", function() {
				const place = Autocomplete.getPlace().geometry.location
				
				localMap.setCenter(place)
				localMap.setZoom(13)

				localMarker.setPosition(place)
			})
		} else {
			alert("El elemento con ID 'autocomplete' no fue encontrado")
		}
	}

	calculateRoute() {
		const startLocation = this.startPoint
		const finishLocation = this.searchedLocation.getPlace().geometry.location

		const mapRequest = {origin: startLocation, destination: finishLocation, travelMode: google.maps.TravelMode.DRIVING}
		this.directionServices.route(mapRequest, (routeResult: any, routeStatus: any) => {
			if (routeStatus === google.maps.DirectionsStatus.OK) {
				this.directionRenderer.setDirections(routeResult)
			} else {
				alert("No fue posible calcular la ruta a esta direccion.")
			}

			this.localMarker.setPosition(null)
		})
	}
}