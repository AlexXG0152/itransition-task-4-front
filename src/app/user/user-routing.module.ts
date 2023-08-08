import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'userTable',
    component: UserTableComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'userTable' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
