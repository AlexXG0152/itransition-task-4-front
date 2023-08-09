import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CheckboxService } from '../../services/checkbox.service';
import {
  TooltipPosition,
  TooltipTheme,
} from 'src/app/shared/interfaces/tooltip.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.scss'],
})
export class UserToolbarComponent {
  constructor(
    private userService: UserService,
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

  onChangeStatus(status: string) {
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

    const data: any[] = [];

    selectedCheckboxes.forEach((id) =>
      data.push({
        id: id,
        status: status,
      })
    );

    this.userService.updateUser(data).subscribe(() => {
      this.userService.getAllUsers().subscribe((users) => {
        this.userService.passResults(users);
      });
    });
  }
}
