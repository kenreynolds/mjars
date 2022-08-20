import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';

import { Member } from '../models/member.model';

import { environment } from 'src/environments/environment';

const MEMBERS_API_URL = `${environment.apiUrl}/members`;

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
    const member: Member = {
      id: null,
      firstName: newMemberData.firstName,
      lastName: newMemberData.lastName,
      emailAddress: newMemberData.emailAddress,
      phoneNumber: newMemberData.phoneNumber,
      address: newMemberData.address,
      city: newMemberData.city,
      state: newMemberData.state,
      zipCode: newMemberData.zipCode,
      callSign: newMemberData.callSign,
      licenseClass: newMemberData.licenseClass,
      membershipType: newMemberData.membershipType,
      title: newMemberData.title,
      arrlMember: newMemberData.arrlMember,
      interests: newMemberData.interests,
      memberNotes: newMemberData.memberNotes,
    }

    this.http
      .post<{ message: string, memberId: string }>(MEMBERS_API_URL, member)
      .subscribe(responseData => {
        const id = responseData.memberId;
        member.id = id;
        this.members.push(member);
        this.membersUpdated.next([...this.members]);
        this.router.navigate(['/members']);
      });
  }

  deleteMember(memberId: string) {
    this.http
      .delete(`${MEMBERS_API_URL}/${memberId}`)
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
    }>(`${MEMBERS_API_URL}/${memberId}`);
  }

  getMembers() {
    this.http.get<{ message: string, members: any }>(MEMBERS_API_URL)
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
    const member: Member = {
      id: memberId,
      firstName: memberData.firstName,
      lastName: memberData.lastName,
      emailAddress: memberData.emailAddress,
      phoneNumber: memberData.phoneNumber,
      address: memberData.address,
      city: memberData.city,
      state: memberData.state,
      zipCode: memberData.zipCode,
      callSign: memberData.callSign,
      licenseClass: memberData.licenseClass,
      membershipType: memberData.membershipType,
      title: memberData.title,
      arrlMember: memberData.arrlMember,
      interests: memberData.interests,
      memberNotes: memberData.memberNotes,
    }
    this.http.put(`${MEMBERS_API_URL}/${memberId}`, member)
      .subscribe(response => {
        const updatedMembers = [...this.members];
        const oldMemberIndex = updatedMembers.findIndex(m => m.id === member.id);

        updatedMembers[oldMemberIndex] = member;
        this.members = updatedMembers;
        this.membersUpdated.next([...this.members]);
        this.router.navigate(['/members']);
      });
  }
}
