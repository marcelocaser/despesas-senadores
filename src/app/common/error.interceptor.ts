import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(this.handleError.bind(this)),
      );
  }

  handleError(error: HttpErrorResponse) {
    let message: string;
    if (error.status == 0) {
      // Se o status é 0, o request não completou (normalmente erro de rede, back end fora do ar, etc.)
      message = 'Não foi possível comunicar com o servidor.'
    } else {
      // Caso contrário é interessante verificar os status 400, 500, etc. de acordo com a aplicação.
      // Aqui coloquei uma mensagem genérica por simplicidade.
      message = 'Ocorreu um erro desconhecido.'
    }
    this.dialog.open(ErrorDialogComponent, {
      width: '16rem',
      data: message
    });
    return throwError(error);
  }
}
