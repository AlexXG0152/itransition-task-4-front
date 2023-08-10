import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { ErrorService } from 'src/app/shared/services/error.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  USERS_API = environment.USERS_API;

  getAllUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(`${this.USERS_API}`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  getUser(id: string): Observable<IUser> {
    return this.http
      .get<IUser>(`${this.USERS_API}/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  updateUser(data: Partial<IUser>): Observable<{message: string}> {
    return this.http
      .patch<{message: string}>(`${this.USERS_API}`, { data })
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  deleteUser(id: string): Observable<IUser> {
    return this.http
      .delete<IUser>(`${this.USERS_API}/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  allUsers$ = new BehaviorSubject<IUser[]>([]);
  passResults(users: IUser[]): void {
    this.allUsers$.next(users);
  }
  getPassedResults(): Observable<IUser[]> {
    return this.allUsers$
      .asObservable()
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handleError(error);
    return throwError(() => error.message);
  }
}
