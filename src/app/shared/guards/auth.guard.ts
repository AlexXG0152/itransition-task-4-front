import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export function authGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);

    // if (oauthService.hasAccess()) {
    //   return true;
    // }
    // oauthService.login();
    return false;
  };
}
