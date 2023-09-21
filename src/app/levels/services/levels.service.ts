import { Injectable } from '@angular/core';
import { Level } from '../models/level.model';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LevelResponse, LevelsResponse } from '../models/levels-response.model';

@Injectable()
export class LevelsService {
  private levels: Level[] = [];
  levelsChanged = new Subject<Level[]>();

  constructor(private http: HttpClient) 
  { }

  getLevels(): Level[] {
    return this.levels.slice();
  }

  setLevels(levels: Level[]) {
    this.levels = levels;
    this.levelsChanged.next(this.levels.slice());
  }

  fetchAllLevels() {
    return this.http
      .get<LevelsResponse>(environment.baseApi + 'Levels')
      .pipe(
        catchError(this.handleError),
        tap(result => {
          this.setLevels(result.data)
        })
      )
  }

  fetchLevelById(id: number) {
    return this.http
      .get<LevelResponse>(environment.baseApi + 'Levels/' + id)
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
