import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IconsModule } from "../icons.module";
import { StorageService } from "../services/storage.service";
import { Router, RouterModule } from "@angular/router";

@Component({
    selector: "app-conductor",
    templateUrl: "./conductor.page.html",
    styleUrls: ["./conductor.page.scss"],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        IconsModule,
        RouterModule,
    ],
})
export class ConductorPage implements OnInit {
    constructor(
        private storageService: StorageService,
        private router: Router
    ) {}

    ngOnInit() {}
}
