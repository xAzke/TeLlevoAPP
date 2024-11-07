import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { IconsModule } from "../icons.module";
import { UserService } from "../user.service";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
    standalone: true,
    imports: [IonicModule, FormsModule, IconsModule, RouterModule],
})
export class HomePage implements OnInit {
    userName!: string;

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit() {}

    onLogout() {
        this.router.navigate(["login"]);
    }
}
