import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { StudentDegreesResponse } from 'src/app/student/models/student-degrees-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStudentDegree() {
    return this.http
      .get<StudentDegreesResponse> (
        environment.baseApi + 'StudentDegrees'
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
