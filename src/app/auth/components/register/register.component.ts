import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from '../../services/data-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private toastr: ToastrService,
    private router: Router) 
  {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let name = '';
    let email = '';
    let isTeacher = false;
    let password = '';
    let confirmPassword = '';

    this.registerForm = new FormGroup({
      'name': new FormControl(name, [Validators.required, Validators.minLength(10)]),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'isTeacher': new FormControl(isTeacher, null),
      'password': new FormControl(password, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(confirmPassword, Validators.required)
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.dataStorageService.register(this.registerForm.value)
      .subscribe(res => {
        this.isLoading = false;
        console.log(res);
        this.router.navigate(["/auth/login"]);
        this.toastr.success(res.messages.toString());
        this.registerForm.reset();
      }, errorRes => {
        this.isLoading = false;
        console.log(errorRes);
        this.toastr.error(errorRes);
      });
  }


}
