import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

// Material Component
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from '../../Model/auth';
import { NotifyService } from '../../Service/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private documentTitle: Title,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private notify: NotifyService
  ) {}

  passwordHide: boolean = true;
  // returnUrl!: string;
  pageTitle!: string;
  loginForm!: FormGroup;
  res!: LoginResponse;
  err!: HttpErrorResponse;
  loggingIn: boolean = false;

  ngOnInit(): void {
    this.passwordHide = true;
    this.pageTitle = 'Login | Online Shopping for Men & Women Shoes';
    this.documentTitle.setTitle(this.pageTitle);
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * send a request to auth service to make HTTP POST request
   * if form is valid
   */
  formSubmit() {
    if (this.loginForm.valid) {
      this.loggingIn = true;
      // console.log(this.returnUrl);
      this.auth.login(this.loginForm.value).subscribe({
        next: (data: LoginResponse) => {
          console.log(data);
          this.res = data;
          localStorage.setItem('access_token', data.accessToken);
          this.auth.authStatusToggle = true;
          this.router.navigate(['']);
          this.loggingIn = false;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.err = error;
          if (error.status == 400) {
            this.notify.warning(error.error.message);
          } else {
            this.notify.warning(error.error.message);
          }
          this.loggingIn = false;
        },
      });
    }
  }

  passwordShow() {
    this.passwordHide = !this.passwordHide;
  }
}
