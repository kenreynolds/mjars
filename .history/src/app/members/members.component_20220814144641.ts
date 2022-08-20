import { Component, OnInit } from '@angular/core';
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

  /* fetchMembers() {
    this.membersService
      .getMembers()
      .subscribe({
        next: members => this.getMemberCount(members),
        error: error => this.showError(error)
      });
  } */

  // For testing Node API only :::
  fetchMembers() {
    this.membersService
      .getMembers()
      .subscribe({
        next: membersResponse => this.getMemberCount(membersResponse.members),
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
