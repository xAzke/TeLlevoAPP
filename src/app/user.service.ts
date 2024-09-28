import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor() {}

  // CREAR METODO PARA VALIDAR EL INGRESO DEL USUARIO DESDE UN SERVICIO

  validateService(userName: String, userPass: Number): Boolean {
    // USAREMOS LOGIN = ADMIN, PASSWORD = 1234
    if (userName == "admin" && userPass == 1234) {
      return true;
    } else {
      return false;
    }
  }
}
