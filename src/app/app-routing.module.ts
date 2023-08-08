import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { LoginComponent } from './auth/components/login/login.component';
import { UserRoutingModule } from './user/user-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false }),
    AuthRoutingModule,
    UserRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
