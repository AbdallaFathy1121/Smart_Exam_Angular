import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubjectsService } from '../../services/subjects.service';
import { ToastrService } from 'ngx-toastr';
import { SubjectsModel } from '../../models/subjects.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DeleteSubjectModel } from '../../models/delete-subject.model';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  subjects: SubjectsModel[] = [];
  userId!: string | undefined; 
  isLoading = false;

  constructor (
    private subjectsService: SubjectsService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userId = user?.userId;
      this.getAllSubjects();
    });
  }
  
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  getAllSubjects() {
    this.isLoading = true;
    this.subjectsService.getAllSubjects()
      .subscribe((res) => {
        this.subjects = res.data;
        this.isLoading = false;
      }, errorRes => {
        this.toastr.error(errorRes);
        this.isLoading = false;
      });
  }

  onDeleteSubject(id: number) {
    this.isLoading = true;

    const model = {
      id: id,
      teacherId: this.userId
    } as DeleteSubjectModel
  
    this.subjectsService.deleteSubject(model)
      .subscribe(res => {
        this.toastr.success(res.messages.toString());
        this.getAllSubjects();
        this.isLoading = false;
      }, errorRes => {
        this.toastr.error(errorRes);
        this.isLoading = false;
      });
  
  
  }
  
}
