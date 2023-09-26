import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModule } from './matrial.module';


@NgModule({
  declarations: [
    LoadingComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatrialModule
  ],
  exports: [
    CommonModule,
    LoadingComponent,
    NavbarComponent,
    MatrialModule
  ],
})
export class SharedModule {}
