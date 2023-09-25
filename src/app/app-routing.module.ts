import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from './auth/services/is-authenticated.guard';
import { HasRoleGuard } from './auth/services/has-role.guard';
import { Roles } from './shared/models/roles';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./subjects/subjects.module').then((x) => x.SubjectsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: 'doctor',
    canActivate: [IsAuthenticatedGuard, HasRoleGuard],
    data: {
      role: Roles.TEACHER
    },
    loadChildren: () => import('./doctor/doctor.module').then((x) => x.DoctorModule),
  },
  {
    path: 'student',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./student/student.module').then((x) => x.StudentModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
