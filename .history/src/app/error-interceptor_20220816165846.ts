import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          alert(error.error.error.message);
          return throwError(() => {
            new Error();
          });
        })
      );
  }
}
