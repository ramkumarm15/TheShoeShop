import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { AuthService } from 'src/app/Service/auth.service';

import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginResponse } from 'src/app/Model/auth';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotifyService } from 'src/app/Service/notify.service';
import { routes } from 'src/app/app-routing.module';
import * as Rx from 'rxjs';
import { LoginComponent } from 'src/app/Component/login/login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fb = new FormBuilder();
  let router: Router;

  let authService = jasmine.createSpyObj('AuthService', ['login']);
  let notify = jasmine.createSpyObj('NotifyService', ['warning']);

  let loginSucceedResponse: LoginResponse = {
    accessToken: 'token',
    userId: 1,
    username: 'Testtest',
  };

  let loginFailedResponse: LoginResponse = {
    accessToken: 'token',
    userId: 1,
    username: 'Testtest',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        { provide: FormBuilder, useValue: fb },
        { provide: AuthService, useValue: authService },
        { provide: NotifyService, useValue: notify },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.loginForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    TestBed.resetTestingModule();
  });

  it(`formSubmit() should called and expect 'loginForm' should be valid, 
  authService.login() should return response and 
  check 'notify.success()' called.`, () => {
    spyOn(router, 'navigate');

    component.loginForm.controls['username'].setValue('ramkumar');
    component.loginForm.controls['password'].setValue('Ramkumar@45');

    expect(component.loginForm.valid).toBeTruthy();

    authService.login.and.returnValue(Rx.of(loginSucceedResponse));

    component.formSubmit();
    expect(component.res).toEqual(loginSucceedResponse);

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it(`formSubmit() should called and expect 'loginForm' should be valid, 
  authService.login() should return HttpErrorResponse with status 204 and 
  check 'notify.warning()' called.`, () => {
    console.log(authService.login);

    component.loginForm.controls['username'].setValue('ramkumar');
    component.loginForm.controls['password'].setValue('Ramkumar@45');

    expect(component.loginForm.valid).toBeTruthy();

    authService.login.and.returnValue(
      Rx.throwError(
        () =>
          new HttpErrorResponse({
            error: { message: 'test error' },
            status: 204,
          })
      )
    );

    component.formSubmit();
    expect(component.err.error.message).toEqual('test error');
    expect(component.err.status).toEqual(204);
    expect(notify.warning).toHaveBeenCalledWith('test error');
  });

  it(`formSubmit() should called and expect 'loginForm' should be valid, 
  authService.login() should return HttpErrorResponse with status 400 and 
  check 'notify.warning()' called.`, () => {
    console.log(authService.login);

    component.loginForm.controls['username'].setValue('ramkumar');
    component.loginForm.controls['password'].setValue('Ramkumar@45');

    expect(component.loginForm.valid).toBeTruthy();

    authService.login.and.returnValue(
      Rx.throwError(
        () =>
          new HttpErrorResponse({
            error: { message: 'test error' },
            status: 400,
          })
      )
    );

    component.formSubmit();
    expect(component.err.error.message).toEqual('test error');
    expect(component.err.status).toEqual(400);
    expect(notify.warning).toHaveBeenCalledWith('test error');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`check loginForm valid status should be false`, () => {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('check loginForm valid status should be true', () => {
    component.loginForm.controls['username'].setValue('ramkumar');
    component.loginForm.controls['password'].setValue('Ramkumar@45');

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should usernmae control show required validation', () => {
    const usernameControl = component.loginForm.controls['username'];
    expect(usernameControl?.valid).toBeFalsy();

    usernameControl?.setValue('');
    expect(usernameControl?.hasError('required')).toBeTruthy();
  });

  it('should usernmae control show minlength validation', () => {
    const usernameControl = component.loginForm.controls['username'];
    expect(usernameControl?.valid).toBeFalsy();

    usernameControl?.setValue('test');
    expect(usernameControl?.hasError('minlength')).toBeTruthy();
  });

  it('should password control show required validation', () => {
    const password = component.loginForm.controls['password'];
    expect(password?.valid).toBeFalsy();

    password?.setValue('');
    expect(password?.hasError('required')).toBeTruthy();
  });

  it('should password control show minlength validation', () => {
    const password = component.loginForm.controls['password'];
    expect(password?.valid).toBeFalsy();

    password?.setValue('test');
    expect(password?.hasError('minlength')).toBeTruthy();
  });
});
