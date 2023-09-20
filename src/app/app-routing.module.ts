import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(x => x.HomeModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)},
  {path: 'levels', loadChildren: () => import('./levels/levels.module').then(x => x.LevelsModule)},
  {path: "**", redirectTo: '', pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
