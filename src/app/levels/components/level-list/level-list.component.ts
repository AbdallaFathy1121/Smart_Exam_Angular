import { Component, OnDestroy, OnInit } from '@angular/core';
import { LevelsService } from '../../services/levels.service';
import { Level } from '../../models/level.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit, OnDestroy {
  levels: Level[] = [];
  levelsSubscription!: Subscription;

  constructor(private levelsService: LevelsService)
  {}

  ngOnInit(): void {
    this.levels = this.levelsService.getLevels();
    this.levelsSubscription = this.levelsService.levelsChanged
    .subscribe((levels: Level[]) => {
      this.levels = levels;
    })
  }
  
  ngOnDestroy(): void {
    this.levelsSubscription.unsubscribe();
  }
}
