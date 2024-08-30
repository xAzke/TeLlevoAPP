import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: true,
	imports: [IonicModule, FormsModule],
})
export class HomePage implements OnInit {
	nombre: string = "Carlitos"
	edad = "4"
	carrera: any = "analista"

	var_username: string = ""
	var_password: number = 0

	constructor(private router: Router) {

	}

	ngOnInit() {
		// Recepcion de los Parametros
		const navigation = this.router.getCurrentNavigation()
		if (navigation?.extras.queryParams) {
			this.var_username = navigation.extras.queryParams["username"]
			this.var_password = navigation.extras.queryParams["password"]
		}
	}
}
