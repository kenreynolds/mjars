import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { AddMemberComponent } from './components/add-member/add-member.component';

@NgModule({
  declarations: [MembersComponent, AddMemberComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MembersRoutingModule,
  ],
})
export class MembersModule {}
