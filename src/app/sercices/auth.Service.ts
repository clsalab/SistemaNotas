import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
    })
    export class AuthService {
        private readonly TOKEN_KEY = 'token';
    private readonly ROLES_KEY = 'roles';

    private apiUrl = 'http://localhost:3002'; // Cambia la URL según la ubicación de tu API

    constructor(private http: HttpClient) { }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        }
        
        // Método para obtener el token JWT del almacenamiento local
        getToken(): string | null {
            return localStorage.getItem(this.TOKEN_KEY);
        }
        
        // Método para eliminar el token JWT del almacenamiento local
        removeToken(): void {
            localStorage.removeItem(this.TOKEN_KEY);
        }
        
        // Método para almacenar los roles del usuario en el almacenamiento local
        setRoles(roles: string[]): void {
            localStorage.setItem(this.ROLES_KEY, JSON.stringify(roles));
        }
        
        // Método para obtener los roles del usuario del almacenamiento local
        getRoles(): string[] | null {
            const rolesString = localStorage.getItem(this.ROLES_KEY);
            return rolesString ? JSON.parse(rolesString) : null;
        }
        
        // Método para verificar si el usuario está autenticado
        isLoggedIn(): boolean {
            return !!this.getToken(); // Devuelve true si el token está presente
        }
        
        // Método para verificar si el usuario tiene los roles necesarios
        hasRequiredRoles(requiredRoles: string[]): boolean {
            const userRoles = this.getRoles();
            return userRoles !== null && requiredRoles.every(role => userRoles.includes(role));
        }
        
        // Método para cerrar sesión
        logout(): void {
            this.removeToken();
        }
        login(email: string, password: string): Observable<boolean> {
            const loginUrl = `${this.apiUrl}/login`;
            const credentials = { email, password };
        
            return this.http.post<any>(loginUrl, credentials)
                .pipe(
                    map(response => {
                    if (response.token) {
                        // Si se recibe un token JWT en la respuesta, almacenarlo
                        this.setToken(response.token);
                        // Si hay roles en la respuesta, almacenarlos
                        if (response.roles) {
                        this.setRoles(response.roles);
                        }
                        return true; // Inicio de sesión exitoso
                    } else {
                        return false; // Inicio de sesión fallido
                    }
                    }),
                    catchError(error => {
                    // Manejar errores de la solicitud HTTP
                    console.error('Error en la solicitud de inicio de sesión:', error);
                    return throwError('Algo salió mal. Por favor, inténtelo de nuevo.');
                    })
                );
            }
            getUserRoles(): Observable<string[]> {
                // Aquí puedes implementar la lógica para obtener los roles del usuario desde el backend
                // Por ejemplo, podrías hacer una solicitud HTTP al backend para obtener los roles del usuario
                // y luego devolver los roles como un Observable<string[]>.
                // El siguiente es solo un ejemplo ficticio:
            
                // Suponiendo que tienes una ruta en tu backend para obtener los roles del usuario:
                // const userRolesUrl = `${this.apiUrl}/auth/userRoles`;
                
                // Retorna un Observable con los roles del usuario obtenidos del backend
                // return this.http.get<string[]>(userRolesUrl);
                
                // En este ejemplo ficticio, retornamos un Observable con roles de ejemplo:
                return new Observable<string[]>(observer => {
                  // Simulamos una respuesta exitosa del backend con roles de ejemplo después de un breve retraso
                    setTimeout(() => {
                        observer.next(['admin', 'user']);
                        observer.complete();
                    }, 1000);
                    });
                }
    }
