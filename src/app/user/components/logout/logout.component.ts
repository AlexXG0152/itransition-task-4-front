import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, pipe } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  TooltipPosition,
  TooltipTheme,
} from 'src/app/shared/interfaces/tooltip.enum';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  position: TooltipPosition = TooltipPosition.BELOW;
  theme: TooltipTheme = TooltipTheme.DEFAULT;
  tooltip = '';
  left = 0;
  top = 0;
  visible = false;

  logout(): Subscription {
    return this.authService
      .logout()
      .subscribe(pipe(() => this.router.navigate(['/login'])));
  }
}
