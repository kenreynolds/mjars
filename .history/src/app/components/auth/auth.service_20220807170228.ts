import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { AuthResponseData } from './auth.model';
import { User } from './user.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient) { }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 10);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'That email already exists. Please Sign in or try using another email address.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'User not found. Please try another email address.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password. Please try again.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'That user has been disabled. Please contact the administrator.';
        break;
    }

    return throwError(() => new Error(errorMessage));
  }

  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${environment.firebase.emailSigninURL}?key=${environment.firebase.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(signinData => {
          this.handleAuthentication(
            signinData.email,
            signinData.localId,
            signinData.idToken,
            +signinData.expiresIn
          )
        })
      );
  }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${environment.firebase.emailSignupURL}?key=${environment.firebase.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }
}
