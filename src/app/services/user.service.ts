import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: "root",
})
export class UserService {
    static userData: any = {};
    static userName: string = "";

    constructor(private storageService: StorageService) {}

    // CREAR METODO PARA VALIDAR EL INGRESO DEL USUARIO DESDE UN SERVICIO

    async validateService(
        userName: string,
        userPass: number
    ): Promise<boolean> {
        let userValid = await this.storageService.getItem("usuarios", userName);
        if (userValid) {
            if (userValid.password == userPass) {
                return true;
            } else {
                return false;
            }
        }

        return false;
    }

    setUserData(userData: any) {
        UserService.userData = userData;
    }

    getUserData() {
        return UserService.userData;
    }

    setUserName(userName: string) {
        UserService.userName = userName;
    }

    getUserName() {
        return UserService.userName;
    }
}
