import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IconsModule } from '../icons.module';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: true,
	imports: [IonicModule, FormsModule, IconsModule],
})
export class HomePage implements OnInit {
	userName!: string;

	constructor(private router: Router) {}

	ngOnInit() {
		const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
            const { username } = navigation.extras.state as { username: string };
			this.userName = username;
        }
	}

	onLogout() {
		this.router.navigate(['login']);
	}
}
