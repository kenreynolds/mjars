import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  catchError,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  throwError
} from 'rxjs';

import { AuthService } from 'src/app/components/auth/auth.service';
import { Member } from '../models/member.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private members: Member[] = [];
  private updatedMembers = new Subject<Member[]>();

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  // OLD: Firebase:
  /* createMember(postData: any): Observable<any> {
    return this.http
      .post(`${environment.firebase.databaseURL}/members.json`, postData)
      .pipe(catchError(this.handleError));
  }

  getMembers(): Observable<any> {
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

  // NEW: Node.js API
  createMember(postData: any): Observable<any> {
    // TODO: Refactor so subscription happens here.
    return this.http.post<{ message: string, memberId: string }>(
        'http://localhost:3000/api/members', postData
      )
      .pipe(catchError(this.handleError));
  }

  deleteMember(memberId: string): Observable<any> {
    return this.http.delete(
      `http://localhost:3000/api/members/${memberId}`
    );
  }

  getMembers() {
    this.http.get<{ message: string, members: any }>(
      'http://localhost:3000/api/members'
    )
    .pipe(map(memberData => {
      return memberData.members.map(member => {
        return {
          id: member._id,
          firstName: member.firstName,
          lastName: member.lastName,
          emailAddress: member.emailAddress,
          phoneNumber: member.phoneNumber,
          address: member.address,
          city: member.city,
          state: member.state,
          zipCode: member.zipCode,
          callSign: member.callSign,
          licenseClass: member.licenseClass,
          membershipType: member.membershipType,
          title: member.title,
          arrlMember: member.arrlMember,
          interests: member.interests,
          memberNotes: member.memberNotes,
        };
      });
    }))
    .subscribe(mappedMembers => {
      this.members = mappedMembers;
      this.updatedMembers.next([...this.members]);
    });
  }

  getMembersUpdateListener() {
    return this.updatedMembers.asObservable();
  }

  handleError(error: any) {
    return throwError(() => {
      console.error(error);
    });
  }
}
