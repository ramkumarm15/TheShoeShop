import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserResponse } from 'src/app/Model/user';
import { NotifyService } from 'src/app/Service/notify.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  loading: boolean = false;
  dataLoading: boolean = false;
  userDetails!: User;

  /**
   * Constructor
   * @param fb create forms
   * @param user user service
   * @param notify notify service display alerts
   */
  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private notify: NotifyService
  ) {}

  userProfileForm!: FormGroup;

  ngOnInit() {
    this.userProfileForm = this.fb.group({
      name: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      about: ['', [Validators.required, Validators.maxLength(200)]],
      city: ['', [Validators.required]],
      age: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    this.getUserData();
  }

  /**
   * Method for set value to form controls
   * @param data User type
   */
  setFormValue(data: User): void {
    this.userProfileForm.controls['name'].setValue(data.name);
    this.userProfileForm.controls['emailAddress'].setValue(data.emailAddress);
    this.userProfileForm.controls['about'].setValue(data.about);
    this.userProfileForm.controls['city'].setValue(data.city);
    this.userProfileForm.controls['gender'].setValue(data.gender);
    this.userProfileForm.controls['age'].setValue(data.age);
    this.userProfileForm.controls['mobileNumber'].setValue(data.mobileNumber);
  }

  mobileNumberLengthCheck(e: Event): void {
    let mobileNumber = (e.target as HTMLInputElement).value;

    if (mobileNumber.length !== 10) {
      this.userProfileForm.controls['mobileNumber'].setErrors({
        requiredLength: true,
      });
    } else if (mobileNumber.length === 10) {
      this.userProfileForm.controls['mobileNumber'].setValue(
        Number(mobileNumber)
      );
    }
  }

  /**
   * Method to call service for fetch user details
   */
  getUserData(): void {
    this.user.getMe().subscribe({
      next: (res: User) => {
        console.log(res);
        this.user.userData = res;
        this.userDetails = res;
        this.setFormValue(res);
      },
      error: (err: HttpErrorResponse) => {
        this.notify.warning(err.error.message);
      },
    });
  }

  /**
   * Method to submit form send data service for POST HTTP request
   */
  onSubmit(): void {
    console.log(this.userProfileForm);
    if (this.userProfileForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.user.updateUserData(this.userProfileForm.value).subscribe({
          next: (res: UserResponse) => {
            this.getUserData();
            this.notify.success(res.message);
            this.loading = false;
          },
          error: (err: HttpErrorResponse) => {
            this.notify.warning(err.error.message);
            this.loading = false;
          },
        });
      }, 2000);
    }
  }
}
