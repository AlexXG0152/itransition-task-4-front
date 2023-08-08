import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserToolbarComponent } from './components/user-toolbar/user-toolbar.component';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from '../shared/components/tooltip/tooltip.module';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [UserTableComponent, UserToolbarComponent, LogoutComponent],
  imports: [CommonModule, FormsModule,TooltipModule],
  exports:[LogoutComponent]
})
export class UserModule {}
