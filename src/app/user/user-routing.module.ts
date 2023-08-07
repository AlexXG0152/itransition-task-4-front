import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { LoginComponent } from '../auth/components/login/login.component';

const routes: Routes = [
  { path: 'userTable', component: UserTableComponent },
  { path: '**', redirectTo: 'userTable' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
