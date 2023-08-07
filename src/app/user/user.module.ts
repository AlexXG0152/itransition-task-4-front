import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserToolbarComponent } from './components/user-toolbar/user-toolbar.component';



@NgModule({
  declarations: [
    UserTableComponent,
    UserToolbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
