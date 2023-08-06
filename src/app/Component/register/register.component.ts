import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { UserResponse } from '../../Model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyService } from '../../Service/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  /**
   * Constructor
   * @param fb
   * @param auth
   * @param router
   * @param notify
   * @param documentTitle
   */
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService,
    private documentTitle: Title
  ) {}

  passwordHide: boolean = true;
  registerForm!: FormGroup;
  submitted: boolean = false;

  pageTitle: string = 'Create account | Online Shopping for Men & Women Shoes';

  ngOnInit(): void {
    this.documentTitle.setTitle(this.pageTitle);
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(8)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      city: ['', [Validators.required]],
      about: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
    });
  }

  /**
   * Method to submit form send data service for POST HTTP request
   */
  formSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value).subscribe({
        next: (data: UserResponse) => {
          console.log(data);
          this.notify.success(data.message);
          this.submitted = false;
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          this.submitted = false;
          if (error.status == 400) {
            this.notify.warning(error.error.message);
          } else {
            this.notify.warning(error.error.message);
          }
        },
      });
    }
  }

  maxLengthCheck(e: Event): void {
    let username = (e.target as HTMLInputElement).value;

    if (username.length < 8 && username != '') {
      this.registerForm.controls['username'].setErrors({
        requiredLength: true,
      });
    }
  }
}
