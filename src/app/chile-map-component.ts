import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-chile-map',
  templateUrl: './chile-map.component.html',
  styleUrls: ['./chile-map.component.scss']
})
export class ChileMapComponent implements OnInit {
  map: L.Map | undefined;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    this.map = L.map('map').setView([-35.6751, -71.5430], 6); // Coordenadas centradas en Chile

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
}
