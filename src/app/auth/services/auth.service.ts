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
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { Tokens } from 'src/app/shared/interfaces/token.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  AUTH_API = environment.AUTH_API;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  login(email: string, password: string): Observable<Tokens> {
    return this.http
      .post<Tokens>(
        `${this.AUTH_API}/signin`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap((res: Tokens) => {
          this.saveTokens(res.accessToken, res.refreshToken);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<IUser> {
    return this.http
      .post<IUser>(
        `${this.AUTH_API}/signup`,
        { username, email, password },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap((res) => res)
      );
  }

  logout(): Observable<string> {
    return this.http
      .post<string>(`${this.AUTH_API}/signout`, {}, this.httpOptions)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(() => this.clearTokens())
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

  refreshAccessToken(): Observable<Tokens> {
    return this.http
      .post<Tokens>(`${this.AUTH_API}/refreshtoken`, this.getRefreshToken())
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap((res) => localStorage.setItem('accessToken', res.accessToken))
      );
  }

  checkAccessToken(): Observable<Pick<Tokens, 'accessToken' >> {
    return this.http
      .get<Pick<Tokens, 'accessToken' >>(`${this.AUTH_API}/checkaccesstoken`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    // this.errorService.handle(error.message);
    this.errorService.handleError(error);
    return throwError(() => error.message);
  }
}
