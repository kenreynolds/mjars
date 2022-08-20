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

  createMember(newMemberData: any) {
    this.http.post<{ message: string, memberId: string }>(
      'http://localhost:3000/api/members', newMemberData
    )
    .subscribe(responseData => {
      const id = responseData.memberId;
      newMemberData.id = id;
      this.members.push(newMemberData);
      this.updatedMembers.next([...this.members]);
    });
  }

  deleteMember(memberId: string) {
    this.http.delete(
      `http://localhost:3000/api/members/${memberId}`
    )
    .subscribe(() => {
      const updatedMembers = this.members.filter(member => member.id !== memberId);
      this.members = updatedMembers;
      this.updatedMembers.next([...this.members]);
    });
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
