import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CheckboxService } from '../../services/checkbox.service';
import {
  TooltipPosition,
  TooltipTheme,
} from 'src/app/shared/interfaces/tooltip.enum';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { pipe } from 'rxjs/internal/util/pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.scss'],
})
export class UserToolbarComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private checkboxService: CheckboxService,
    private toastr: ToastrService
  ) {}

  position: TooltipPosition = TooltipPosition.BELOW;
  theme: TooltipTheme = TooltipTheme.DEFAULT;
  tooltip = '';
  left = 0;
  top = 0;
  visible = false;

  selectedCheckboxValues = this.checkboxService.selectedCheckboxValues || 0;

  onChangeStatus(status: string): void {
    let selectedCheckboxes = this.checkboxService.selectedCheckboxValues;

    if (selectedCheckboxes.length === 0) {
      this.toastr.warning(
        `Please check some user to ${
          status == 'blocked'
            ? 'block'
            : status == 'active'
            ? 'unblock'
            : 'delete'
        }`,
        'Warning'
      );
      return;
    }

    const data: Partial<IUser>[] = [];

    selectedCheckboxes.forEach((id) =>
      data.push({
        id: id,
        status: status,
      })
    );

    this.userService
      .updateUser(data as Partial<IUser>)
      .subscribe((response) => {
        if (response.message !== 'User was blocked') {
          this.userService.getAllUsers().subscribe((users) => {
            this.userService.passResults(users);
          });
        } else {
          this.authService
            .logout()
            .subscribe(pipe(() => this.router.navigate(['/login'])));
        }
      });
  }
}
