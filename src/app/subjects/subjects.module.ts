import { NgModule } from '@angular/core';
import { SubjectListComponent } from './components/subject-list/subject-list.component';
import { SubjectComponent } from './components/subject/subject.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SubjectListComponent, SubjectComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: SubjectListComponent}
    ])
  ]
})
export class SubjectsModule { }
