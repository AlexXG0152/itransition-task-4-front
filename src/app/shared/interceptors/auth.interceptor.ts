import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Route, Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();

    if (accessToken) {
      request = this.addAuthorizationHeader(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        switch (error.status) {
          case 401:
            if (error.error.message === 'Sign in again!') {
              // this.authService.logout();
              // this.router.navigate(['/login']);
              break
            }
            if (error.error.message  === 'Invalid Password!') {
              break
            }
            if (!request.url.includes('/api/auth/refreshtoken')) {
              return this.handleUnauthorizedError(request, next);
            }
            break;

          case 403:
            if (error.error.message === 'No token provided!') {
              this.router.navigate(['/login']);
            }
            break;

          case 400:
            if (error.error.message === 'Sign in again!') {
              this.router.navigate(['/login']);
            }
            break;
        }

        return throwError(error);
      })
    );
  }

  private addAuthorizationHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  private handleUnauthorizedError(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.refreshAccessToken().pipe(
      switchMap((response) => {
        const newAccessToken = response.accessToken;

        if (newAccessToken) {
          this.authService.saveTokens(
            newAccessToken,
            this.authService.getRefreshToken()!
          );

          request = this.addAuthorizationHeader(request, newAccessToken);
          return next.handle(request);
        } else {
          this.authService.logout();
          this.router.navigate(['/login'])
          return throwError('Unauthorized');
        }
      }),
      catchError((error) => {
        this.authService.logout();
        this.router.navigate(['/login'])
        return throwError('Unauthorized');
      })
    );
  }
}
