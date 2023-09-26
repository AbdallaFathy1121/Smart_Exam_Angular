import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddSubjectModel } from '../models/add-subject.model';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { SubjectResponse } from '../models/subject-response.model';
import { AddQuestionModel } from '../models/add-question.model';
import { MainResponse } from 'src/app/shared/models/main-response.model';
import { QuestionsResponse } from '../models/questions-response.model';
import { DeleteQuestionModel } from '../models/delete-question.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  addSubject(model: AddSubjectModel) {
    return this.http
      .post<SubjectResponse> (
        environment.baseApi + 'Subjects/Add',
        model
      )
      .pipe(
        catchError(this.handleError)
      )
  }

  addQuestion(model: AddQuestionModel) {
    return this.http
      .post<MainResponse> (
        environment.baseApi + 'Questions/Add',
        model
      )
      .pipe(
        catchError(this.handleError)
      )
  }

  getQuestionsBySubjectId(subjectId: number) {
    return this.http
      .get<QuestionsResponse> (environment.baseApi + 'Questions/' + subjectId)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteQuestionById(model: DeleteQuestionModel) {
    return this.http
      .post<MainResponse> (
        environment.baseApi + 'Questions/Delete',
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
