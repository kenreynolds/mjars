import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../components/auth/auth.guard';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { MembersComponent } from './members.component';

const routes: Routes = [
  { path: '', component: MembersComponent },
  { path: 'add-member', component: AddMemberComponent },
  { path: 'edit-member/:memberId', component: AddMemberComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembersRoutingModule {}
