import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';

import { AddMemberComponent } from './components/add-member/add-member.component';
import { MembersComponent } from './members.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MembersComponent
  },
  {
    path: 'add-member',
    canActivate: [AuthGuard],
    component: AddMemberComponent
  },
  {
    path: 'edit-member/:memberId',
    canActivate: [AuthGuard],
    component: AddMemberComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class MembersRoutingModule {}
