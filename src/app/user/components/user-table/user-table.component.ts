import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  constructor(private userService: UserService) {}
  users?: User[];

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }
}
