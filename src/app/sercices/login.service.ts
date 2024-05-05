import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginRequest } from '../interfaces/loginRequest';
import { UserData } from '../interfaces/userData';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
    })
    export class LoginService {
    private apiUrl = 'http://localhost:3002';
    
    currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    currentUserData: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

    constructor(private http: HttpClient) {
        const token = localStorage.getItem('token');
    if (token) {
        this.currentUserLoginOn.next(true);
      // Realizar solicitud adicional para obtener el nombre de usuario y el correo electrónico
        this.fetchUserData(token);
    }
    }
    private fetchUserData(token: string): Observable<User> {
        const userUrl = `${this.apiUrl}/auth/userdata`;
        
        return this.http.get<any>(userUrl, { headers: { Authorization: `Bearer ${token}` } }).pipe(
            map((userData: any) => {
            const updatedUserData: User = {
                _id: userData._id,
                token: token,
                username: userData.username || 'Nombre no disponible',
                useremail: userData.useremail || 'Email no disponible',
            };
        
            this.currentUserData.next(updatedUserData);
            return updatedUserData;
            }),
            catchError(this.handleError)
        );
    }

    

    login(credentials: LoginRequest): Observable<boolean> {
        const loginUrl = `${this.apiUrl}/auth/login`;

        return this.http.post<boolean>(loginUrl, credentials).pipe(
        tap(() => {
            // Realizar acciones adicionales si es necesario, como almacenar el token en localStorage
        }),
        catchError(this.handleError),
        map(_ => true)
        );
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

        logout(): void {
            // Elimina el token del localStorage al cerrar sesión
            localStorage.removeItem('token');
            this.currentUserLoginOn.next(false);
            this.currentUserData.next(null);
        }
        //Se agregaron estas dos lineas
        isLoggedIn(): boolean {
            return this.currentUserLoginOn.value;
        }

  // Otros métodos y propiedades del servicio...
}
