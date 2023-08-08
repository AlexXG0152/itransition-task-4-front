import { Component, HostListener } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CheckboxService } from '../../services/checkbox.service';
import { Router } from '@angular/router';
import { pipe } from 'rxjs/internal/util/pipe';
import { AuthService } from '../../../auth/services/auth.service';
import { TooltipPosition, TooltipTheme } from 'src/app/shared/interfaces/tooltip.enum';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.scss'],
})
export class UserToolbarComponent {
  constructor(
    private userService: UserService,
    private checkboxService: CheckboxService,
    private authService: AuthService,
    private router: Router
  ) {}

  position: TooltipPosition = TooltipPosition.BELOW;
  theme: TooltipTheme = TooltipTheme.DEFAULT;
  tooltip = '';
  left = 0;
  top = 0;
  visible = false;

  selectedCheckboxValues = this.checkboxService.selectedCheckboxValues || 0

  onChangeStatus(status: string) {
    const selectedCheckboxes = this.checkboxService.selectedCheckboxValues;
    const data: any[] = [];

    selectedCheckboxes.forEach((id) =>
      data.push({
        id: id,
        status: status,
      })
    );
    this.checkboxService.clearSelectedCheckboxes();

    this.userService.updateUser(data).subscribe(() => {
      this.userService.getAllUsers().subscribe((users) => {
        this.userService.passResults(users);
      });
    });
  }


}
