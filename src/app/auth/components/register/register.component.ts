import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Register } from '../../models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
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
      'fullName': new FormControl(name, [Validators.required, Validators.minLength(10)]),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'password': new FormControl(password, [Validators.required, Validators.minLength(8)]),
      'confirmPassword': new FormControl(confirmPassword, Validators.required),
      'isTeacher': new FormControl(isTeacher)
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.register(this.registerForm.value)
      .subscribe(res => {
        this.isLoading = false;
        this.router.navigate(["/auth/login"]);
        this.toastr.success(res.messages.toString());
        this.registerForm.reset();
      }, errorRes => {
        this.isLoading = false;
        this.toastr.error(errorRes);
      });
  }


}
