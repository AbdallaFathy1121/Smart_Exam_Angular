import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { StudentService } from '../../services/student.service';
import { ToastrService } from 'ngx-toastr';
import { StudentDegree } from '../../models/student-degree.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.scss']
})
export class DegreesComponent implements OnInit, OnDestroy {
  isLoading = false;
  userId!: string;
  studentDegrees: StudentDegree[] = [];
  userSubscription!: Subscription;
  dataSource:any
  displayedColumns:any

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) {
        this.userId = user?.userId;
        this.getStudentDegreesByUserId();
      }
      else {
        this.router.navigate(['/auth/login']);
      }
    })
  }
  
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  getStudentDegreesByUserId() {
    this.isLoading = true;
    this.studentService.getStudentDegreeByUserId(this.userId)
      .subscribe((res) => {
        this.studentDegrees = res.data;
        this.displayedColumns = ['ID', 'subjectName', 'degree', 'examDegree', 'percentage'];
        this.dataSource = this.studentDegrees;
        this.isLoading = false;
      }, errorRes => {
        this.router.navigate(['/']);
        this.toastr.error(errorRes);
        this.isLoading = false;
      })
  }

}
