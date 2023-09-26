import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubjectsModule } from '../subjects.module';
import { SubjectsResponse } from '../models/subjects-response.model';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { DeleteSubjectModel } from '../models/delete-subject.model';
import { MainResponse } from 'src/app/shared/models/main-response.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient) { }

  getAllSubjects() {
    return this.http
      .get<SubjectsResponse> (environment.baseApi + 'Subjects')
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteSubject(model: DeleteSubjectModel) {
    return this.http
      .post<MainResponse> (
        environment.baseApi + 'Subjects/Delete',
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
