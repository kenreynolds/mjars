import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MembersRoutingModule } from './members-routing.module';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { MembersComponent } from './members.component';

@NgModule({
  declarations: [AddMemberComponent, MembersComponent],
  imports: [BrowserModule, MembersRoutingModule],
  providers: [],
})
export class MembersModule {}
