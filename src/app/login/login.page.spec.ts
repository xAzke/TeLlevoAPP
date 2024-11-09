import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

describe('LoginPage', () => {


	// Testing 1: Comprobar si se crea el formulario de inicio.
	it('P1: Existencia de LoginPane', () => {
		const fixture = TestBed.createComponent(LoginPage)
		const app = fixture.componentInstance;

		expect(app).toBeTruthy()
	})

	// Testing 2: Al ingresar solo el usuario el formulario debe ser invalido.
	it('P2: Formulario Invalido', () => {
		const fixture = TestBed.createComponent(LoginPage)
		const app = fixture.componentInstance

		const usernameControl = app.loginForm.get("username")
		
		// APLICAMOS UN VALOR AL CAMPO DE USUARIO
		usernameControl?.setValue('1234567890')

		// VERIFICAMOS QUE EL FORMULARIO SEA INVALIDO
		expect(app.loginForm.invalid).toBeTrue()
	})

	// Testing 3: Usuario y contraseña son ingresados en el formulario
	it("P3: Formulario Valido", () => {
		const fixture = TestBed.createComponent(LoginPage)
		const app = fixture.componentInstance

		// APLICAMOS UN VALOR AL CAMPO DE USUARIO
		const usernameControl = app.loginForm.get("username")
		usernameControl?.setValue("Pasajero")

		// APLICAMOS UN VALOR AL CAMPO DE CONTRASEÑA
		const passwordControl = app.loginForm.get("password")
		passwordControl?.setValue("1234")

		// VERIFICAMOS QUE EL FORMULARIO SEA VALIDO
		expect(app.loginForm.invalid).toBeFalse()
	})
});
