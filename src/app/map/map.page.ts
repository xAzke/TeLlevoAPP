import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

// API KEY GOOGLE MAPS
// AIzaSyC9i2S9SKxBwLmGYtnVuYvBwyiC0aCnOFg

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MapPage {
  constructor() {}

  autocompleteLocation() {
	alert("Calculo de la ruta en progreso.")
  }
}
