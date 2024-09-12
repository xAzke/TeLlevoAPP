import { Component } from '@angular/core';
import {
    FormsModule,
    FormGroup,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IconsModule } from '../icons.module';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
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

    constructor(private fb: FormBuilder, private router: Router) {
        this.registerForm = this.fb.group({
            usuario: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                    Validators.pattern('^[a-zA-Z0-9]*$'),
                ],
            ],

            nombre: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                    Validators.pattern('^[a-zA-Z\s]+$'),
                ],
            ],

            apellido: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                    Validators.pattern('^[a-zA-Z\s]+$'),
                ],
            ],

            correo: [
                '',
                [
                    Validators.required,
                    Validators.email
                ],
            ],

            telefono: [
                '',
                [
                    Validators.required,
                    Validators.maxLength(9),
                    Validators.pattern('^[0-9]{1,9}$'),
                ],
            ],

            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(8),
                    Validators.pattern('^(?=.*\\d)[A-Za-z\\d]{1,8}$'),
                ],
            ],

            repeat_password: [
                '',
                [
                    Validators.required
                ]
            ],

            perfil: [
                '',
                [
                    Validators.required
                ]
            ],
        },
            {
                validators: this.validatePasswordMatch
            }
        );
    }

    onRegister() {
        if (this.registerForm.valid) {
            const username = this.registerForm.get('usuario')?.value;
            const password = this.registerForm.get('password')?.value;

            this.router.navigate(['login'], {
                state: { username, password }
            });
        }
    }

    validatePasswordMatch(formGroup: FormGroup): void {
        const mainPassword = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('repeat_password')?.value;

        if (mainPassword !== confirmPassword) {
            formGroup.get('repeat_password')?.setErrors({ mismatch: true })
        } else {
            formGroup.get('repeat_password')?.setErrors(null)
        }
    }
}
