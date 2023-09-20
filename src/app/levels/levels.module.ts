import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LevelListComponent } from './components/level-list/level-list.component';
import { LevelEditComponent } from './components/level-edit/level-edit.component';
import { LevelsService } from './services/levels.service';
import { LevelsResolverService } from './services/levels-resolver.service';



@NgModule({
  declarations: [LevelListComponent, LevelEditComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: '', component: LevelListComponent, resolve: {routeResolver: LevelsResolverService}},
      {path: 'new', component: LevelEditComponent},
      {path: ':id/edit', component: LevelEditComponent}
    ])
  ],
  providers: [LevelsService]
})
export class LevelsModule { }
