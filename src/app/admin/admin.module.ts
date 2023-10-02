import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListStudentDegreeComponent } from './components/list-student-degree/list-student-degree.component';



@NgModule({
  declarations: [ListStudentDegreeComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: ListStudentDegreeComponent}
    ])
  ]
})
export class AdminModule { }
