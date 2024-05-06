import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../interfaces/loginRequest';
import { handleError } from '../../utils/handleError';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  logo!: string;
  loginError: Observable<string> = new BehaviorSubject<string>(''); // Inicializamos con un BehaviorSubject

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
    this.loading = true;
    if (this.loginForm.valid) {
      

      const loginData: LoginRequest = {
        useremail: this.loginForm.value.useremail ?? '',
        userpassword: this.loginForm.value.userpassword ?? ''
      };

      this.loginService.login(loginData).subscribe({
        next: (userData) => {
          console.log(userData);
          if (this.loginService.isLoggedIn()) {
            this.loading =false;
            this.router.navigateByUrl('/admin');
          }
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          handleError(errorResponse).subscribe(errorMessage => {
            this.loginError = of(errorMessage); // Elimina asObservable
          });
          this.loading = false;
        },
        complete: () => {
          console.info('Login exitoso');
          this.router.navigateByUrl('/admin');
          this.loginForm.reset();
          this.userLoginOn = true;
          this.loading = false;
        },
      });

    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Método para obtener el valor actual de loginError
  getLoginError(): Observable<string> {
    return this.loginError;
  }
}