import { NgModule } from '@angular/core';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: LayoutComponent}
    ])
  ]
})
export class HomeModule { }
