import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserToolbarComponent } from './components/user-toolbar/user-toolbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserTableComponent, UserToolbarComponent],
  imports: [CommonModule, FormsModule],
})
export class UserModule {}
