import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register.model';
import { MainResponse } from 'src/app/shared/models/main-response.model';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient) { }

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
        catchError(this.handleError)
      )
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
