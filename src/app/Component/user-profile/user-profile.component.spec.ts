/* tslint:disable:no-unused-variable */
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import * as Rx from 'rxjs';
import { UserProfileComponent } from './user-profile.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { NotifyService } from 'src/app/Service/notify.service';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/Model/user';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  const fb = new FormBuilder();
  let spyUserService = jasmine.createSpyObj('UserService', [
    'getMe',
    'updateUserData',
  ]);
  let spyNotifyService = jasmine.createSpyObj('NotifyService', [
    'warning',
    'success',
  ]);

  let userDetails: User = {
    id: 1,
    username: 'test',
    name: 'test',
    emailAddress: 'test@gmail.com',
    about: 'test',
    city: 'test',
    gender: 'test',
    age: 123,
    mobileNumber: 123,
    billingAddresses: [
      {
        id: 1,
        billingName: 'test',
        address1: 'test',
        address2: 'test',
        city: 'test',
        state: 'test',
        mobileNumber: 123456789,
        postalCode: 123456,
        default: false,
      },
    ],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: FormBuilder, useValue: fb },
        { provide: UserService, useValue: spyUserService },
        { provide: NotifyService, useValue: spyNotifyService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;

    component.userProfileForm = fb.group({
      name: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      about: ['', [Validators.required, Validators.maxLength(200)]],
      city: ['', [Validators.required]],
      age: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });

    spyUserService.getMe.and.returnValue(Rx.of(userDetails));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should spyUserService.getMe() called return an HttpErrorResponse 
  and notify.warning() to have been call with "error"`, () => {
    spyUserService.getMe.and.returnValue(
      Rx.throwError(
        () =>
          new HttpErrorResponse({
            error: { message: 'test error' },
            status: 204,
          })
      )
    );
    component.ngOnInit();
    fixture.detectChanges();

    expect(spyNotifyService.warning).toHaveBeenCalledWith('test error');
    expect(component.loading).toBeFalsy();
  });

  it(`onSubmit() should called and expect 'userProfileForm' should be valid, 
  userService.updateUserData() should return response and 'loading' should changed 
  to false after 2000ms timeout`, fakeAsync(() => {
    component.setFormValue(userDetails);
    console.log(component.userProfileForm);
    expect(component.userProfileForm.valid).toBeTruthy();

    spyUserService.updateUserData.and.returnValue(
      Rx.of({
        message: 'Profile updated',
      })
    );

    component.onSubmit();

    tick(2000);

    expect(component.loading).toBeFalsy();
    expect(spyNotifyService.success).toHaveBeenCalledWith('Profile updated');
  }));

  it(`onSubmit() should called and expect 'userProfileForm' should be valid, 
  userService.updateUserData() should return HttpErrorResponse and 'loading' should changed 
  to false after 2000ms timeout`, fakeAsync(() => {
    component.setFormValue(userDetails);
    console.log(component.userProfileForm);
    expect(component.userProfileForm.valid).toBeTruthy();

    spyUserService.updateUserData.and.returnValue(
      Rx.throwError(
        () =>
          new HttpErrorResponse({
            error: { message: 'test error' },
            status: 204,
          })
      )
    );

    component.onSubmit();

    tick(2000);

    expect(component.loading).toBeFalsy();
    expect(spyNotifyService.warning).toHaveBeenCalledWith('test error');
  }));
});
