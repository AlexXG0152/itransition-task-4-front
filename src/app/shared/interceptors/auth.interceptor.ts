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
        if (
          error.status === 401 &&
          !request.url.includes('/api/auth/refreshtoken')
        ) {
          return this.handleUnauthorizedError(request, next);
        } else if (
          error.status === 403 &&
          error.error.message === 'No token provided!'
        ) {
          this.router.navigate(['/login']);
          return throwError(error);
        } else {
          return throwError(error);
        }
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
          return throwError('Unauthorized');
        }
      }),
      catchError((error) => {
        this.authService.logout();
        return throwError('Unauthorized');
      })
    );
  }
}
