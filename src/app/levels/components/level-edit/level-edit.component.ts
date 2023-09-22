import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LevelsService } from '../../services/levels.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Level } from '../../models/level.model';
import { MainResponse } from 'src/app/shared/models/main-response.model';

@Component({
  selector: 'app-level-edit',
  templateUrl: './level-edit.component.html',
  styleUrls: ['./level-edit.component.css']
})
export class LevelEditComponent implements OnInit, OnDestroy {
  id!: number;
  paramSubscription!: Subscription;
  levelForm!: FormGroup;
  editMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private levelsService: LevelsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  private initForm() {
    this.levelForm = new FormGroup({
      'levelName': new FormControl('', [Validators.required])
    });

    if (this.editMode) {
      this.levelsService.fetchLevelById(this.id).subscribe(res => {
        let levelName = res.data.levelName;
        this.levelForm.get('levelName')?.setValue(levelName);
      }, errorRes => {
        this.toastr.error(errorRes);
        this.router.navigate(['/levels']);
      })      
    }
  }

  onSubmit() {
    this.isLoading = true;
    let levelObservable: Observable<MainResponse>;

    if (this.editMode) {
      levelObservable = this.levelsService.updateLevel(this.id, this.levelForm.value);
    } else {
      levelObservable = this.levelsService.addNewLevel(this.levelForm.value);
    }

    levelObservable.subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['/levels']);
      this.toastr.success(res.messages.toString());
      this.levelForm.reset();
    }, errorRes => {
      this.isLoading = false;
      this.toastr.error(errorRes);
    })
  }

}
