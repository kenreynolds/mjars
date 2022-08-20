import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this._snackBar.open('An error occurred!', {
            duration: 3000
          });
          return throwError(() => {
            new Error();
          });
        })
      );
  }
}
