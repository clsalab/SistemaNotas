import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../interfaces/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  logo!: string;
  loginError = '';
  loading = false;
  userLoginOn = false;
  loginForm = this.fb.group({
    useremail: ['', [Validators.required, Validators.email]],
    userpassword: ['', Validators.required]
  });

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.logo = this.sharedService.logo;
  }

  get useremail() {
    return this.loginForm.controls.useremail;
  }

  get userpassword() {
    return this.loginForm.controls.userpassword;
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true; // Activar la carga cuando se inicia el proceso de inicio de sesión
  
      const loginData: LoginRequest = {
        useremail: this.loginForm.value.useremail ?? '',
        userpassword: this.loginForm.value.userpassword ?? ''
      };
  
      this.loginService.login(loginData).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.loginError = 'Error al iniciar sesión. Por favor, inténtalo de nuevo.'; // Mostrar un mensaje de error genérico
          this.loading = false; // Desactivar la carga en caso de error
        },
        complete: () => {
          console.info('Login exitoso');
          this.router.navigateByUrl('/admin');
          this.loginForm.reset();
          this.userLoginOn = true;
          this.loading = false; // Desactivar la carga cuando el proceso de inicio de sesión se completa correctamente
        },
      });
  
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
  
  
  
}