import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { CheckboxService } from '../../services/checkbox.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  constructor(
    private userService: UserService,
    private checkboxService: CheckboxService
  ) {}

  users?: IUser[];
  isAllSelected = false;

  ngOnInit(): void {
    this.checkboxService.selectedCheckboxValues = []
    this.isAllSelected = false;
    this.userService.getAllUsers().subscribe((res) => {
      this.userService.passResults(res);
    });
    this.userService.getPassedResults().subscribe((user) => {
      this.users = user;
    });
  }

  selectAll(checked: boolean): void {
    this.isAllSelected = checked;
    if (checked) {
      this.users!.forEach((user) =>
        this.checkboxService.addSelectedCheckbox(user.id)
      );
    } else {
      // this.users!.forEach((user) =>
      //   this.checkboxService.removeSelectedCheckbox(user.id)
      // );
      // this.isAllSelected = false;
      this.checkboxService.clearSelectedCheckboxes();
    }
  }

  selectUser(id: number, event: Event): void {
    if (event) {
      this.checkboxService.addSelectedCheckbox(id);
    } else {
      this.isAllSelected = false;
      this.checkboxService.removeSelectedCheckbox(id);
    }
  }

  isSelected(id: number) {
    return this.checkboxService.selectedCheckboxValues.includes(id);
  }
}
