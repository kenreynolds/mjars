import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { MembersService } from './services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  members: any = [];
  membershipCount = '0';
  arrlMembershipCount = '0';
  errorMessage: any;

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.fetchMembers();
  }

  fetchMembers() {
    this.membersService
      .getMembers()
      .pipe(
        map((membersData) => {
          return membersData.members.map(member => {
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
        })
      )
      .subscribe({
        next: mappedMmembers => this.getMemberCount(mappedMmembers),
        error: error => this.showError(error)
      });
  }

  getMemberCount(members: any) {
    let count = 0;
    this.members = members;
    this.membershipCount = this.members.length.toString();

    for (const member in this.members) {
      if (this.members[member].arrlMember === 'Yes') {
        count++;
      }
    }

    this.arrlMembershipCount = count.toString();
}

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  showError(error: any) {
    this.errorMessage = 'Error retrieving members. Please come back later.';
    throw error;
  }
}
