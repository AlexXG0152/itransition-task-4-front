import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CheckboxService } from '../../services/checkbox.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { pipe } from 'rxjs/internal/util/pipe';

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

  subscriptions: Subscription[] = [];

  onChangeStatus(status: string) {
    const selectedCheckboxes = this.checkboxService.selectedCheckboxValues;

    // selectedCheckboxes.forEach((id) => {
    //   this.userService.updateUser(id, { status: status }).subscribe(() => {});
    // });
    // this.userService.getAllUsers().subscribe((data) => {
    //   this.userService.passResults(data);
    // });

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

  logout() {
    return this.authService
      .logout()
      .subscribe(pipe(() => this.router.navigate(['/login'])));
  }
}
