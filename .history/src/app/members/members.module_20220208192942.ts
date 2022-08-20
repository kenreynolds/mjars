import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { AddMemberComponent } from './components/add-member/add-member.component';

@NgModule({
  declarations: [MembersComponent, AddMemberComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MembersRoutingModule,
  ],
})
export class MembersModule {}
