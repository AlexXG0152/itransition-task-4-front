import { CanActivateFn } from '@angular/router';

export const blockGuard: CanActivateFn = (route, state) => {
  return true;
};
