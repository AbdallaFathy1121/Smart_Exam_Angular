import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExamService } from '../../services/exam.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { AddSubjectModel } from '../../models/add-subject.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddQuestionModel } from '../../models/add-question.model';
import { Question } from '../../models/question.model';
import { DeleteQuestionModel } from '../../models/delete-question.model';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit, OnDestroy {
  teacherId!: string | undefined;
  userSubscription!: Subscription;
  questionForm!: FormGroup;
  isLoading = false;
  correctAnswer!: string;
  addedSubject = false;
  stepperIndex = 0;
  questions: Question[] = [];
  showquestions = false;

  constructor(
    private authService: AuthService,
    private examService: ExamService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.teacherId = user?.userId;
      if (localStorage.getItem('subjectId')) {
        this.addedSubject = true;
        this.stepperIndex = 1;
      }
      this.initQuestionForm();
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    localStorage.removeItem('subjectId');
  }
  
  onAddSubject(subjectName: string) {
    this.isLoading = true;
    
    const model = {
      name: subjectName,
      teacherId: this.teacherId
    } as AddSubjectModel
    
    this.examService.addSubject(model)
      .subscribe(res => {
        this.toastr.success(res.messages.toString());
        localStorage.setItem('subjectId', res.data.toString());
        this.addedSubject = true;
        this.stepperIndex = 1;
        this.isLoading = false;
      }, errorRes => {
        this.toastr.error(errorRes);
        this.stepperIndex = 0;
        this.isLoading = false
      });
  }
    
  initQuestionForm() {
    this.questionForm = this.fb.group({
      questionName: ['', [Validators.required]],
      a1: ['', [Validators.required]],
      a2: ['', [Validators.required]],
      a3: ['', [Validators.required]],
      a4: ['', [Validators.required]]
    })
  }

  onChange(event: any) {
    this.correctAnswer = event.value;
  }

  onAddQuestion() {
    if (this.correctAnswer) {
      this.isLoading = true;

      const model = {
        subjectId: JSON.parse(localStorage.getItem('subjectId')!),
        questionName: this.questionForm.value.questionName,
        a1: this.questionForm.value.a1,
        a2: this.questionForm.value.a2,
        a3: this.questionForm.value.a3,
        a4: this.questionForm.value.a4,
        correctAnswer: this.questionForm.value[this.correctAnswer]
      } as AddQuestionModel

      console.log(model);

      this.examService.addQuestion(model)
        .subscribe(res => {
          this.toastr.success(res.messages.toString());
          this.questionForm.reset();
          this.isLoading = false;
          }, errorRes => {
            this.toastr.error(errorRes);
            this.isLoading = false
          });

    }
    else {
      this.toastr.error('Please Select the Correct Answer');
    }

  }

  onShowQuestions() {
    this.isLoading = true;
    
    let subjectId = JSON.parse(localStorage.getItem('subjectId')!);
    
    this.examService.getQuestionsBySubjectId(subjectId)
      .subscribe((questions) => {
        this.questionForm.reset();
        this.questions = questions.data;
        if (this.questions.length > 0) {
          this.showquestions = true;
        }
        this.stepperIndex = 2;
        this.isLoading = false;
      }, errorRes => {
        this.showquestions = false;
        this.stepperIndex = 1;
        this.toastr.error(errorRes);
        this.isLoading = false;
      });
  }

  onDelete() {
    this.questionForm.reset();
  }

  onCancel() {
    this.questionForm.reset;
    this.correctAnswer = '';
    this.addedSubject = false;
    localStorage.removeItem('subjectId');
    this.stepperIndex = 0;
  }

  onDeleteQuestionById(id: number) {
    this.isLoading = true;
    
    const model = {
      id: id
    } as DeleteQuestionModel

    this.examService.deleteQuestionById(model)
      .subscribe(res => {
        this.toastr.success(res.messages.toString());
        this.onShowQuestions();
        this.isLoading = false;
      }, errorRes => {
        this.toastr.error(errorRes);
        this.isLoading = false;
      })
  }

}
