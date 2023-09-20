import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent, 
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    HeaderComponent, 
    LoadingComponent
  ],
})
export class SharedModule {}
