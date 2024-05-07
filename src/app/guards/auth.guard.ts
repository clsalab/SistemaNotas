// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles']; // Acceder a expectedRoles utilizando corchetes

    const userRoles = this.authService.getUserRoles(); // Obtener los roles del usuario desde el servicio de autenticación

    // Verificar si el usuario tiene los roles necesarios para acceder a la ruta
    if (this.authService.isLoggedIn() && this.authService.hasRequiredRoles(expectedRoles)) {
      return true; // Permitir acceso si el usuario tiene los roles necesarios
    } else {
      // Redirigir a una ruta adecuada si el usuario no tiene los roles necesarios
      this.router.navigate(['/login']);
      return false;
    } 
  } 
}

