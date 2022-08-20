import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';

import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private members: Member[] = [];
  private membersUpdated = new Subject<Member[]>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createMember(newMemberData: any) {
    this.http.post<{ message: string, memberId: string }>(
      'http://localhost:3000/api/members', newMemberData
    )
    .subscribe(responseData => {
      const id = responseData.memberId;
      newMemberData.id = id;
      this.members.push(newMemberData);
      this.membersUpdated.next([...this.members]);
      this.router.navigate(['/members']);
    });
  }

  deleteMember(memberId: string) {
    this.http.delete(
      `http://localhost:3000/api/members/${memberId}`
    )
    .subscribe(() => {
      const updatedMembers = this.members.filter(member => member.id !== memberId);
      this.members = updatedMembers;
      this.membersUpdated.next([...this.members]);
    });
  }

  getMember(memberId: string) {
    return this.http.get<{
      _id: string,
      firstName: string,
      lastName: string,
      emailAddress: string,
      phoneNumber: string,
      address: string,
      city: string,
      state: string,
      zipCode: string,
      callSign: string,
      licenseClass: string,
      membershipType: string,
      title: string,
      arrlMember: string,
      interests: string,
      memberNotes: string,
    }>(`http://localhost:3000/api/members/${memberId}`);
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
      this.membersUpdated.next([...this.members]);
    });
  }

  getMembersUpdateListener() {
    return this.membersUpdated.asObservable();
  }

  updateMember(memberId: string, memberData: any) {
    this.http.put(
      `http://localhost:3000/api/members/${memberId}`, memberData
    )
    .subscribe(response => {
      const updatedMembers = [...this.members];
      const oldMemberIndex = updatedMembers.findIndex(m => m.id === memberData.id);

      updatedMembers[oldMemberIndex] = memberData;
      this.members = updatedMembers;
      this.membersUpdated.next([...this.members]);
      this.router.navigate(['/members']);
    });
  }
}
