import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ExamComponent } from './components/exam/exam.component';
import { RouterModule } from '@angular/router';
import { DegreesComponent } from './components/degrees/degrees.component';


@NgModule({
  declarations: [
    ExamComponent,
    DegreesComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'exam/:id', component: ExamComponent},
      {path: 'degrees', component: DegreesComponent}
    ])
  ]
})
export class StudentModule { }
