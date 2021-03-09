import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './Lists/Lists.component';
import { MemberListComponent } from './Members/MemberList/MemberList.component';
import { MemberDetailComponent } from './Members/member-detail/member-detail.component';
import { MessagesComponent } from './Messages/Messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberlistResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './Members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
        // resolve: {users: MemberlistResolver}},
      {path: 'members/:username', component: MemberDetailComponent,
        resolve: {user: MemberDetailResolver}},
      {path: 'member/edit/:username', component: MemberEditComponent,
        resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
      {path: 'messages', component: MessagesComponent},
      {path: 'lists', component: ListsComponent}
    ]
  },

  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
