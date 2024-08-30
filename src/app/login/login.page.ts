import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    FormGroup,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})

export class LoginPage {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
        this.loginForm = this.fb.group({
            username: [
                '',
                [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(8),
                Validators.pattern('^[a-zA-Z0-9]*$')],
            ],
            password: [
                '',
                [Validators.required,
                Validators.minLength(4),
                Validators.maxLength(4),
                Validators.pattern('^[0-9]*$')],
            ],
        });
    }

    onLogin() {
        if (this.loginForm.valid) {
            const username = this.loginForm.get("username")?.value;
            const password = this.loginForm.get("password")?.value;
            
            this.router.navigate(["home"], {queryParams: {username, password}})
        }
    }
}
