import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
    providedIn: "root",
})
export class NotificationsService {
    constructor() {}

    showInfo(infoTitle: any, infoMsg: any, infoIcon: any) {
        return Swal.fire({
            icon: infoIcon,
            title: infoTitle,
            text: infoMsg,
            heightAuto: false,
        });
    }

    showToast(infoMsg: any, infoIcon: any) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        return Toast.fire({
            icon: infoIcon,
            title: infoMsg,
        });
    }
}
