import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{
  userLoginOn:boolean=false;
  userData?:User;

  constructor(
    private loginService:LoginService
  ){}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        // Utiliza el operador de "nullish coalescing" (??) para asignar un valor por defecto
        this.userData = userData ?? undefined;
      },
    });
  }
}
