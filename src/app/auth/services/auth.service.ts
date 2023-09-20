import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { MainResponse } from 'src/app/shared/models/main-response.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, map, take, tap, throwError } from 'rxjs';
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
    localStorage.removeItem('userData');
  }

  autoLogin() {
    const userData: {
      userId: string;
      name: string;
      email: string;
      roles: [];
      token: string;
      tokenExpiration: string;
    } = JSON.parse(localStorage.getItem('userData')!);
    if(!userData) {
      return;
    }

    const loadedUser = new User(
      userData.userId, 
      userData.name, 
      userData.email,
      userData.roles,
      userData.token,
      userData.tokenExpiration
    );
    
    if(loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  private handleAuthentication(data: any) {
    const user = new User(data.userId, data.name, data.email, data.roles, data.token, data.tokenExpiration);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
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
}
