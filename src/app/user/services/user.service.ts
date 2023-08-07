import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  USERS_API = 'http://localhost:8080/api/users';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.USERS_API}`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.USERS_API}/:id`);
  }
}
