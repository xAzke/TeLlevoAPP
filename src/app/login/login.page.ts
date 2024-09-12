import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    FormGroup,
    ReactiveFormsModule,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { AnimationController, Animation, IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { IconsModule } from '../icons.module';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
    ],
})
export class LoginPage {
    loginForm!: FormGroup;

    @ViewChild('logo', { read: ElementRef })
    logo?: ElementRef<HTMLImageElement>;

    @ViewChild('text', { read: ElementRef })
    text?: ElementRef<HTMLImageElement>;

    private logoAnimation!: Animation;
    private textAnimation!: Animation;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private animationCtrl: AnimationController
    ) {
        this.loginForm = this.fb.group({
            username: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(8),
                    Validators.pattern('^[a-zA-Z0-9]*$'),
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
        });
    }

    onLogin() {
        if (this.loginForm.valid) {
            const username = this.loginForm.get('username')?.value;
            const password = this.loginForm.get('password')?.value;

            this.router.navigate(['home'], {
                state: { username, password },
            });
        }
    }

    ngAfterViewInit() {
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras.state) {
            const { username, password } = navigation.extras.state as { username: string; password: string };
            this.loginForm.get('username')?.setValue(username);
            this.loginForm.get('password')?.setValue(password);
        }

        if (this.logo?.nativeElement && this.text?.nativeElement) {
            this.logoAnimation = this.animationCtrl
                .create()
                .addElement(this.logo.nativeElement)
                .duration(3000)
                .fromTo('opacity', '0', '1');

            this.textAnimation = this.animationCtrl
                .create()
                .addElement(this.text.nativeElement)
                .duration(100)
                .fromTo('transform', 'translateY(20px)', 'translateY(0)');

            this.logoAnimation.play();
            this.textAnimation.play();
        } else {
            console.log("¡Error en la animacion del logo o del texto!")
        }
    }
}
