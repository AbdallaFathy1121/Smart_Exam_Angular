import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectsService } from 'src/app/subjects/services/subjects.service';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from 'src/app/doctor/services/exam.service';
import { Question } from 'src/app/doctor/models/question.model';
import { DeleteQuestionModel } from 'src/app/doctor/models/delete-question.model';
import { StudentAnswerModel } from '../../models/student-answer.model';
import { AddStudentDegreeModel } from '../../models/add-student-degree.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit, OnDestroy {
  subjectId!: number;
  subjectName: string = '';
  userId: string = '';
  teacherId!: string | undefined;
  paramSubscription!: Subscription;
  userSubscription!: Subscription;
  questions: Question[] = [];
  isLoading = false;
  studentAnswers: StudentAnswerModel[] = [];
  totalDegree: number = 0;

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
        if (user) {
          this.userId = user.userId;
        }
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

  onDeleteQuestion(id: number) {
    this.isLoading = true;

    const model = {
      id: id
    } as DeleteQuestionModel

    this.examService.deleteQuestionById(model)
      .subscribe(res => {
        this.toastr.success(res.messages.toString());
        this.isLoading = false;
        this.getQuestionsBySubjectId();
      }, errorRes => {
        this.toastr.error(errorRes);
        this.isLoading = false;
      })
  }

  onAddStudentAnswer(questionId: number, event: any) {
    let answer = event.value;

    // Get question by ID
    let question = this.questions.find(x=> x.id == questionId);
    
    // Get student answer by question ID
    let studentAnswer = this.studentAnswers.find(x=> x.questionId == questionId);
    if (studentAnswer != null) {
      if (answer == question?.correctAnswer) {
        studentAnswer.degree = 1;
      }
      else {
        studentAnswer.degree = 0;
      }
    }
    else {
      let degree = 0;
      if (answer == question?.correctAnswer) {
        degree = 1;
      }
      let model = new StudentAnswerModel(questionId, degree);
      this.studentAnswers.push(model);
    }
  }

  onFinishExam() {
    this.isLoading = true;
    this.totalDegree = 0;

    this.studentAnswers.forEach(element => {
      this.totalDegree += element.degree;
    });

    const model = {
      subjectId: this.subjectId,
      userId: this.userId,
      degree: this.totalDegree,
      examDegree: this.questions.length
    } as AddStudentDegreeModel

    this.studentService.AddStudentDegree(model)
      .subscribe(res => {
        this.toastr.success(res.messages.toString());
        this.isLoading = false;
      }, errorRes => {
        this.toastr.error(errorRes);
        this.isLoading = false;
      })
  }

}
