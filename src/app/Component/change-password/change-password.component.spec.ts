import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as Rx from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { UserResponse } from 'src/app/Model/user';
import { NotifyService } from 'src/app/Service/notify.service';
import { UserService } from 'src/app/Service/user.service';
import { compare } from 'src/app/shared/utils/validators';
import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  const fb = new FormBuilder();
  let passwordService = jasmine.createSpyObj('UserService', [
    'updateUserPassword',
  ]);
  let notify = jasmine.createSpyObj('NotifyService', ['warning', 'success']);

  let userValidResponse: UserResponse = {
    message: 'Password Updated',
    status: 200,
  };

  let userPasswordUpdateDetails = {
    oldPassword: 'testtesttest',
    newPassword: 'testtesttest',
    confirmPassword: 'testtesttest',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangePasswordComponent],
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
        { provide: UserService, useValue: passwordService },
        { provide: NotifyService, useValue: notify },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;

    component.changePasswordForm = fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(8)]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: compare('newPassword', 'confirmPassword') }
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit() should submit form after 2000ms timeout successfully ', fakeAsync(() => {
    component.changePasswordForm.controls['oldPassword'].setValue(
      userPasswordUpdateDetails.oldPassword
    );
    component.changePasswordForm.controls['newPassword'].setValue(
      userPasswordUpdateDetails.newPassword
    );
    component.changePasswordForm.controls['confirmPassword'].setValue(
      userPasswordUpdateDetails.confirmPassword
    );
    expect(component.changePasswordForm.valid).toBeTruthy();

    passwordService.updateUserPassword.and.returnValue(
      Rx.of(userValidResponse)
    );

    component.onSubmit();

    tick(2000);

    expect(component.loading).toBeFalsy();
    expect(notify.success).toHaveBeenCalledWith('Password Updated');
  }));

  it('onSubmit() should submit form after 2000ms timeout and failed ', fakeAsync(() => {
    component.changePasswordForm.controls['oldPassword'].setValue(
      userPasswordUpdateDetails.oldPassword
    );
    component.changePasswordForm.controls['newPassword'].setValue(
      userPasswordUpdateDetails.newPassword
    );
    component.changePasswordForm.controls['confirmPassword'].setValue(
      userPasswordUpdateDetails.confirmPassword
    );
    expect(component.changePasswordForm.valid).toBeTruthy();

    passwordService.updateUserPassword.and.returnValue(
      Rx.throwError(() => new HttpErrorResponse({ error: { message: 'test error' } }))
    );

    component.onSubmit();

    tick(2000);

    expect(component.loading).toBeFalsy();
    expect(notify.warning).toHaveBeenCalledWith('test error');
  }));
});
