import { Component, OnDestroy, OnInit } from '@angular/core';
import { Level } from '../../models/level.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { LevelsService } from '../../services/levels.service';

@Component({
  selector: 'app-level-edit',
  templateUrl: './level-edit.component.html',
  styleUrls: ['./level-edit.component.css']
})
export class LevelEditComponent implements OnInit, OnDestroy {
  id!: number;
  level!: Level; 
  paramSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private levelsService: LevelsService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.levelsService.fetchLevelById(this.id)
        .subscribe(res => {
          this.level = res.data;
          console.log(this.level);
        }, errorRes => {
          console.log(errorRes);
        });
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

}
