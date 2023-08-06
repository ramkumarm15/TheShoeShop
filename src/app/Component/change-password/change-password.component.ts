import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserResponse } from 'src/app/Model/user';
import { NotifyService } from 'src/app/Service/notify.service';
import { UserService } from 'src/app/Service/user.service';
import { compare } from 'src/app/shared/utils/validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  passwordHide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private notify: NotifyService
  ) {}

  loading: boolean = false;
  submitted: boolean = false;

  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: compare('newPassword', 'confirmPassword') }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.changePasswordForm);
    if (this.changePasswordForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.user.updateUserPassword(this.changePasswordForm.value).subscribe({
          next: (res: UserResponse) => {
            this.notify.success(res.message);
            this.loading = false;
            this.changePasswordForm.reset();
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.notify.warning(err.error.message);
            this.loading = false;
          },
        });
      }, 2000);
    }
  }
}
