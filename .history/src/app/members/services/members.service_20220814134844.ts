import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, switchMap, take, throwError } from 'rxjs';

import { AuthService } from 'src/app/components/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private members = [];

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  createMember(postData: any): Observable<any> {
    return this.http
      .post(`${environment.firebase.databaseURL}/members.json`, postData)
      .pipe(catchError(this.handleError));
  }

  // From Firebase:
  /* getMembers(): Observable<any> {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        console.log(`User: ${user}`); // user returning 'null'; why?
        return this.http
          .get(`${environment.firebase.databaseURL}/members.json`, {
            params: new HttpParams().set('auth', user.token)
          });
        }),
        map((responseData: any) => {
          const membersArray: any = [];

          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              membersArray.push({ ...responseData[key], id: key });
            }
          }

          return membersArray;
        }),
        catchError(this.handleError)
    );
  } */

  getMembers(): Observable<any> {
    return this.http
      .get('http://localhost:3000/api/members');
  }

  handleError(error: any) {
    return throwError(() => {
      console.error(error);
    });
  }
}
