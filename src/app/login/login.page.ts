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

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: [
                '',
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(8),
                Validators.pattern('^[a-zA-Z0-9]*$'),
            ],
            password: [
                '',
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(4),
                Validators.pattern('^[0-9]*$'),
            ],
        });
    }

    ngOnInit() {}
}
