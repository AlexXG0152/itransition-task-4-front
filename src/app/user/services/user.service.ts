import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  USERS_API = 'http://localhost:8080/api/users';

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.USERS_API}`);
  }

  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.USERS_API}/${id}`);
  }

  updateUser(data: any) {
    return this.http.patch<IUser>(`${this.USERS_API}`, { data });
  }

  deleteUser(id: string) {
    return this.http.delete<IUser>(`${this.USERS_API}/${id}`);
  }

  allUsers$ = new BehaviorSubject<IUser[]>([]);
  passResults(users: IUser[]): void {
    this.allUsers$.next(users);
  }
  getPassedResults(): Observable<IUser[]> {
    return this.allUsers$.asObservable();
  }
}
