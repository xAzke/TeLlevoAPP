import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";

@Injectable({
    providedIn: "root",
})
export class UserService {
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
}
