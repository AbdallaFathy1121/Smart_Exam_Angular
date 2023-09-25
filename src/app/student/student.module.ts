import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ExamComponent } from './components/exam/exam.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'exam', component: ExamComponent}
    ])
  ]
})
export class StudentModule { }
