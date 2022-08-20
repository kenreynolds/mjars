import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';

import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  private members: Member[] = [];
  private membersUpdated = new Subject<Member[]>();

  constructor(private http: HttpClient) { }

  createMember(newMemberData: any) {
    this.http.post<{ message: string, memberId: string }>(
      'http://localhost:3000/api/members', newMemberData
    )
    .subscribe(responseData => {
      const id = responseData.memberId;
      newMemberData.id = id;
      this.members.push(newMemberData);
      this.membersUpdated.next([...this.members]);
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

  getMember(id: string) {
    return { ...this.members.find(m => m.id === id) };
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
    .subscribe(response => console.log(response));
  }
}
