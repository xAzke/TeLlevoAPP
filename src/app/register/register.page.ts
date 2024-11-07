import { Component } from "@angular/core";
import {
    FormsModule,
    FormGroup,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { IconsModule } from "../icons.module";
import { CommonModule } from "@angular/common";
import { StorageService } from "../services/storage.service";
import { NotificationsService } from "../services/notifications.service";

interface User {
    usuario: string;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    password: string;
    perfil: string;
}

@Component({
    selector: "app-register",
    templateUrl: "./register.page.html",
    styleUrls: ["./register.page.scss"],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
    ],
})
export class RegisterPage {
    registerForm!: FormGroup;

    users: User[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private storageService: StorageService,
        private notificationService: NotificationsService
    ) {
        this.registerForm = this.fb.group(
            {
                usuario: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(20),
                        Validators.pattern("^[a-zA-Z0-9]*$"),
                    ],
                ],

                nombre: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50),
                        Validators.pattern("^[a-zA-Zs]+$"),
                    ],
                ],

                apellido: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50),
                        Validators.pattern("^[a-zA-Zs]+$"),
                    ],
                ],

                correo: ["", [Validators.required, Validators.email]],

                telefono: [
                    "",
                    [
                        Validators.required,
                        Validators.maxLength(9),
                        Validators.pattern("^[0-9]{1,9}$"),
                    ],
                ],

                password: [
                    "",
                    [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(8),
                        Validators.pattern("^(?=.*\\d)[A-Za-z\\d]{1,8}$"),
                    ],
                ],

                repeat_password: ["", [Validators.required]],

                perfil: ["", [Validators.required]],
            },
            {
                validators: this.validatePasswordMatch,
            }
        );
    }

    async onRegister() {
        if (this.registerForm.valid) {
            const userName = this.registerForm.get("usuario")?.value;
            const userPass = this.registerForm.get("password")?.value;

            const newUser = {
                usuario: userName,
                nombre: this.registerForm.get("nombre")?.value,
                apellido: this.registerForm.get("apellido")?.value,
                correo: this.registerForm.get("correo")?.value,
                telefono: this.registerForm.get("telefono")?.value,
                password: userPass,
                perfil: this.registerForm.get("perfil")?.value,
            };

            this.users.push(newUser);

            let isUserAlreadyTaken = await this.storageService.getItem(
                "usuarios",
                newUser.usuario
            );
            if (!isUserAlreadyTaken) {
                await this.storageService.setItem("usuarios", newUser);

                this.router.navigate(["login"], {
                    state: { userName, userPass },
                });

                this.notificationService.showInfo(
                    "Usuario Registrado",
                    "¡Registro exitoso!",
                    "success"
                );
            } else {
                this.registerForm.get("usuario")?.setErrors({ taken: true });
            }
        }
    }

    validatePasswordMatch(formGroup: FormGroup): void {
        const mainPassword = formGroup.get("password")?.value;
        const confirmPassword = formGroup.get("repeat_password")?.value;

        if (mainPassword !== confirmPassword) {
            formGroup.get("repeat_password")?.setErrors({ mismatch: true });
        } else {
            formGroup.get("repeat_password")?.setErrors(null);
        }
    }
}
