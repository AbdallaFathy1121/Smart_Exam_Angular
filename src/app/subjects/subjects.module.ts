import { NgModule } from '@angular/core';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SubjectListComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: SubjectListComponent}
    ])
  ]
})
export class SubjectsModule { }
