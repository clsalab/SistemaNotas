import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

export function handleError(error: HttpErrorResponse): Observable<string> {
    console.error('Error en la solicitud:', error);

    let errorMessage = 'Algo falló. Por favor intente nuevamente.';

    if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // Error del lado del servidor
        if (error.status === 0) {
            errorMessage = 'Se ha producido un error de red';
        } else {
            errorMessage = `Backend retornó el código de estado ${error.status} con el mensaje: ${error.error.message || error.message}`;
        }
    }

    // Verificar si el error es 403 (Forbidden)
    if (error.status === 403) {
        return throwError('Contraseña incorrecta. Por favor, vuelva a intentarlo.');
    }

    console.error('Detalles del error:', error);

    // Devolver el mensaje de error o un mensaje predeterminado si el error es null
    return throwError(errorMessage);
}
