import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatrialModule } from './matrial.module';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatrialModule
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    MatrialModule
  ],
})
export class SharedModule {}
