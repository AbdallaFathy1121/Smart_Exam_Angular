import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddStudentDegreeModel } from '../models/add-student-degree.model';
import { MainResponse } from 'src/app/shared/models/main-response.model';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor (
    private http: HttpClient
  ) {}

  AddStudentDegree(model: AddStudentDegreeModel) {
    return this.http
      .post<MainResponse> (
        environment.baseApi + 'StudentDegrees/Add',
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
