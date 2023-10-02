import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { StudentsComponent } from './components/students/students.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NewExamComponent,
    StudentsComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'new-exam', component: NewExamComponent},
      {path: 'students/:id', component: StudentsComponent}
    ])
  ]
})
export class DoctorModule { }
