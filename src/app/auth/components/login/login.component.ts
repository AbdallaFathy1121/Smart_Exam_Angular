import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
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
    let email = '';
    let password = '';

    this.loginForm = new FormGroup({
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'password': new FormControl(password, [Validators.required, Validators.minLength(8)]),
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.dataStorageService.login(this.loginForm.value)
      .subscribe((res) => {
        this.isLoading = false;
        console.log(res);
        this.router.navigate(['/']);
        this.toastr.success(res.messages.toString());
        this.loginForm.reset();
      }, errorRes => {
        this.isLoading = false;
        console.log(errorRes);
        this.toastr.error(errorRes);
      });
  }





}
