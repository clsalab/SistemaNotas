import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
[x: string]: any;
userLoginOn: boolean =false;
userData?:User;
loading: boolean = false;
items: MenuItem[] = [
  {label: 'Nota', icon: 'pi pi-fw pi-home'},
  {label: 'Horario', icon: 'pi pi-fw pi-info'}
  // Agrega más elementos MenuItem si es necesario
];

constructor(
  private loginService:LoginService,
  private router:Router,
){}

ngOnInit(): void {
  this.loading = false;
  this.loginService.currentUserLoginOn.subscribe(
    {
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    }
  );
  this.loginService.currentUserData.subscribe({
    next: (userData) => {
      // Utiliza el operador de "nullish coalescing" (??) para asignar un valor por defecto
      this.userData = userData ?? undefined;
    },
  });
}
logout(): void {
  // Guarda los datos del usuario antes de cerrar sesión
  const tokenBeforeLogout = localStorage.getItem('token');
  const userDataBeforeLogout = localStorage.getItem('userData');
  this.loading = false

  // Cierra sesión llamando al método logout del servicio LoginService
  this.loginService.logout();
  
  // Verifica si los datos del token y del usuario fueron eliminados correctamente
  const tokenAfterLogout = localStorage.getItem('token');
  const userDataAfterLogout = localStorage.getItem('userData');

  if (!tokenAfterLogout && !userDataAfterLogout) {
    console.log('Sesión finalizada exitosamente');
  } else {
    console.error('Error al cerrar sesión. Los datos del token y/o del usuario aún están presentes en el almacenamiento local');
  }

  // Redirecciona a la página de inicio de sesión después del cierre de sesión
  this.router.navigate(['/login']);
  this.loading = false
}

}
