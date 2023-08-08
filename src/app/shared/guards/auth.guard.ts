import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export function authGuard(): CanActivateFn {
  return () => {
    const oauthService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    if (oauthService.checkAccessToken()) {
      return true;
    }
    router.navigate(['/login']);
    return false;
  };
}
