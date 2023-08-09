import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/services/error.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  AUTH_API = environment.AUTH_API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.AUTH_API}/signin`, { email, password }, this.httpOptions)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap((res: any) => {
          this.saveTokens(res.accessToken, res.refreshToken);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.AUTH_API}/signup`,
        { username, email, password },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap((res) => res)
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.AUTH_API}/signout`, {}, this.httpOptions)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap((res) => this.clearTokens())
      );
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  clearTokens(): void {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
  }

  refreshAccessToken(): Observable<any> {
    return this.http
      .post<any>(`${this.AUTH_API}/refreshtoken`, this.getRefreshToken())
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap((res) => localStorage.setItem('accessToken', res.accessToken))
      );
  }

  checkAccessToken(): Observable<any> {
    return this.http
      .get<any>(`${this.AUTH_API}/checkaccesstoken`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    // this.errorService.handle(error.message);
    this.errorService.handleError(error);
    return throwError(() => error.message);
  }
}
