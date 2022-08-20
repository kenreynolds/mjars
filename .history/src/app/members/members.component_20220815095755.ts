import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Member } from './models/member.model';
import { MembersService } from './services/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  membershipCount = '0';
  arrlMembershipCount = '0';
  errorMessage: any;

  private membersSub: Subscription;

  constructor(private membersService: MembersService) {}

  ngOnInit(): void {
    this.fetchMembers();
  }

  fetchMembers() {
    this.membersService.getMembers();
    this.membersSub = this.membersService.getMembersUpdateListener()
      .subscribe((members: Member[]) => {
        this.getMemberCount(members);
      });
  }

  getMemberCount(members: Member[]) {
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

  onDelete(memberId: string) {
    this.membersService
      .deleteMember(memberId)
      .subscribe(() => {
        const updatedMembers = this.members.filter(member => member.id !== memberId);
        this.members = updatedMembers;
      });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  showError(error: any) {
    this.errorMessage = 'Error retrieving members. Please come back later.';
    throw error;
  }
}
