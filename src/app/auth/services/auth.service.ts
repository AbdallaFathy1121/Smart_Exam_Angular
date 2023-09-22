import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { MainResponse } from 'src/app/shared/models/main-response.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router) 
  {}

  register(model: Register) {
    return this.http
      .post<MainResponse> (
        environment.baseApi + 'Users/Register',
        model
      )
      .pipe(
        catchError(this.handleError)
      )
  }

  login(model: Login) {
    return this.http
      .post<MainResponse> (
        environment.baseApi + 'Users/Login',
        model
      )
      .pipe(
        catchError(this.handleError),
        tap(res => {
          this.handleAuthentication(res.data);
        })
      )
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('token');
  }

  autoLogin() {
    let token = this.getUserToken();
    if(!token) {
      return;
    }

    this.user.next(this.getUser(token));
  }

  private handleAuthentication(data: any) {
    let token = data.token;
    localStorage.setItem('token', JSON.stringify(token));
    this.user.next(this.getUser(token));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.messages) {
        return throwError(errorMessage);
    }

    let errors: string[] = [];
    errorRes.error.messages.forEach((message: string) => {
      errors.push(message);
    });

    return throwError(errors);
  }

  private getUser(token: string): User {
    return JSON.parse(atob(token.split('.')[1])) as User
  }

  getUserToken() {
    return JSON.parse(localStorage.getItem('token')!);
  }

}
