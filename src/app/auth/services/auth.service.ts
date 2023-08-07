import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from 'src/app/shared/services/error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  AUTH_API = 'http://localhost:8080/api/auth';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private accessToken?: string;
  private refreshToken?: string;

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.AUTH_API}/signin`, { username, password }, this.httpOptions)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap((res: any) => {
          this.accessToken = res.accessToken;
          this.refreshToken = res.refreshToken;
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
        tap((res) => res)
      );
  }

  getToken(): string {
    return this.accessToken!;
  }

  getRefreshToken(): string {
    return this.refreshToken!;
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  refreshAccessToken(): Observable<any> {
    return this.http
      .post<any>(`${this.AUTH_API}/refreshtoken`, this.refreshToken)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap((res) => (this.accessToken = res.accessToken))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
