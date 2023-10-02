import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { StudentDegree } from 'src/app/student/models/student-degree.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-student-degree',
  templateUrl: './list-student-degree.component.html',
  styleUrls: ['./list-student-degree.component.scss']
})
export class ListStudentDegreeComponent implements OnInit {
  isLoading = false;
  dataSource:any;
  displayedColumns:any;
  studentDegrees: StudentDegree[] = [];

  constructor (
    private adminService: AdminService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.isLoading = true;
    this.adminService.getAllStudentDegree()
      .subscribe((res) => {
        this.studentDegrees = res.data;
        this.displayedColumns = ['id', 'userName', 'subjectName', 'degree', 'examDegree', 'percentage'];
        this.dataSource = this.studentDegrees;
        console.log(this.studentDegrees);
        this.isLoading = false;
      }, errorRes => {
        this.router.navigate(['/']);
        this.isLoading = false;
      })
  }

}
