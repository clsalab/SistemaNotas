import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { LoginRequest } from '../../interfaces/loginRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3002';
  public currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public currentUserData: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    // Verificar si el usuario está autenticado al cargar el servicio
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.currentUserLoginOn.next(true);
        // Realizar solicitud adicional para obtener el nombre de usuario y el correo electrónico
        this.fetchUserData(token);
      }
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    const loginUrl = `${this.apiUrl}/auth/login`;

    return this.http.post<{ token: string, user: User }>(loginUrl, credentials).pipe(
      tap((response: any) => {
        const userData: User = {
          _id: response.user._id,
          token: response.token,
          username: response.user.username,
          useremail: response.user.useremail,
          userroles: response.user.userroles,
        };
        localStorage.setItem('token', userData.token);
        localStorage.setItem('userData', JSON.stringify(userData));

        console.log('Datos del usuario después del inicio de sesión:', userData);

        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.currentUserLoginOn.next(false);
    this.currentUserData.next(null);
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userData(): Observable<User | null> {
    return this.currentUserData.asObservable();
  }
  

  updateUserData(updatedData: any): Observable<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('Token de usuario no disponible');
    }
    const userId = this.currentUserData.value?._id;
    if (!userId) {
      return throwError('ID de usuario no disponible');
    }
    const updateUrl = `${this.apiUrl}/users/${userId}`;

    return this.http.put<{ user: User }>(updateUrl, updatedData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).pipe(
      map((response: any) => {
        const updatedUser: User = {
          _id: response.user._id,
          token: token,
          username: response.user.username,
          useremail: response.user.useremail,
        };
        this.currentUserData.next(updatedUser);
        return updatedUser;
      }),
      catchError(this.handleError)
    );
  }

  private fetchUserData(token: string): void {
    const userUrl = `${this.apiUrl}/auth/login`;
  
    this.http.get<any>(userUrl, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      map((userData: any) => {
        const updatedUserData: User = {
          _id: userData._id,
          token: token,
          username: userData.username || 'Nombre no disponible',
          useremail: userData.useremail || 'Email no disponible',
        };
  
        this.currentUserData.next(updatedUserData);
      }),
      catchError(this.handleError)
    ).subscribe();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error en la solicitud:', error);
  
    if (error.status === 0) {
      console.error('Se ha producido un error de red');
    } else {
      console.error('Backend retornó el código de estado', error.status, 'con el mensaje:', error.error);
    }
    console.error('Detalles del error:', error);
  
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }
}