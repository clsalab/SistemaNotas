import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
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
