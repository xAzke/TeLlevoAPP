import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Router } from "@angular/router";
import { IconsModule } from "../../icons.module";
import { UserService } from "../../user.service";

@Component({
    selector: "app-viajes",
    templateUrl: "./viajes.page.html",
    styleUrls: ["./viajes.page.scss"],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, IconsModule],
})
export class ViajesPage implements OnInit {
    isDriver: boolean = false;

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit() {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
            this.isDriver =
                navigation.extras.state["dataUser"].perfil === "conductor";
        }
    }

    async ngAfterViewInit() {
        console.log("ViajesPage: ngAfterViewInit");
        console.log(await this.userService.getUserData());
    }
}
