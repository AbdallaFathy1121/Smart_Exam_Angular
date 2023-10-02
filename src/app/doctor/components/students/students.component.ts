import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { StudentDegree } from 'src/app/student/models/student-degree.model';
import { StudentService } from 'src/app/student/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
  isLoading = false;
  subjectId!: number;
  studentDegrees: StudentDegree[] = [];
  userSubscription!: Subscription;
  dataSource:any;
  displayedColumns:any;
  paramSubscription!: Subscription;

  constructor(
    private studentService: StudentService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
   this.paramSubscription = this.route.params.subscribe((params: Params) => {
    this.subjectId = params['id'];
    this.getStudentDegreesBySubjectId();
   })
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

  getStudentDegreesBySubjectId() {
    this.isLoading = true;
    this.studentService.getStudentDegreeBySubjectId(this.subjectId)
      .subscribe((res) => {
        this.studentDegrees = res.data;
        this.displayedColumns = ['userName', 'subjectName', 'degree', 'examDegree', 'percentage'];
        this.dataSource = this.studentDegrees;
        this.isLoading = false;
      }, errorRes => {
        this.router.navigate(['/']);
        this.toastr.error(errorRes);
        this.isLoading = false;
      })
  }

}
