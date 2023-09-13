import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

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



}
