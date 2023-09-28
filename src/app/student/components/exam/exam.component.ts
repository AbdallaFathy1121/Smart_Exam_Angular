import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectsService } from 'src/app/subjects/services/subjects.service';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/doctor/services/exam.service';
import { Question } from 'src/app/doctor/models/question.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit, OnDestroy {
  subjectId!: number;
  subjectName: string = '';
  userId!: string | undefined;
  teacherId!: string | undefined;
  paramSubscription!: Subscription;
  userSubscription!: Subscription;
  questions: Question[] = [];
  isLoading = false;

  constructor (
    private studentService: StudentService,
    private examService: ExamService,
    private authService: AuthService,
    private subjectsService: SubjectsService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}
  
  
  ngOnInit(): void {
    this.paramSubscription = this.route.params
    .subscribe((params: Params) => {
        this.subjectId = params['id'];
        this.getSubjectById();
        this.getQuestionsBySubjectId();
      })

    this.userSubscription = this.authService.user
      .subscribe((user) => {
        this.userId = user?.userId;
        console.log("User ID: " + this.userId);
      })
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  getSubjectById() {
    this.isLoading = true;
    this.subjectsService.getSubjectById(this.subjectId)
      .subscribe((res) => {
        this.teacherId = res.data.teacher.id;
        this.subjectName = res.data.name;
        console.log("teacher Id: " + this.teacherId);
        this.isLoading = false;
      }, errorRes => {
        this.toastr.error(errorRes);
        this.isLoading = false;
      });
  }

  getQuestionsBySubjectId() {
    this.isLoading = true;
    this.examService.getQuestionsBySubjectId(this.subjectId)
      .subscribe((res) => {
        this.questions = res.data;
        this.isLoading = false;
      }, errorRes => {
        this.toastr.error(errorRes);
        this.isLoading = false;
      })
  }

}
