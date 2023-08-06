import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as Rx from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import { UserResponse } from 'src/app/Model/user';
import { AuthService } from 'src/app/Service/auth.service';
import { NotifyService } from 'src/app/Service/notify.service';
import { RegisterComponent } from './register.component';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const fb = new FormBuilder();
  let spyRouter: Router;

  let spyAuthService = jasmine.createSpyObj('AuthService', ['register']);
  let spyNotifyService = jasmine.createSpyObj('NotifyService', [
    'success',
    'warning',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
        { provide: AuthService, useValue: spyAuthService },
        { provide: NotifyService, useValue: spyNotifyService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    spyRouter = TestBed.inject(Router);
    component.registerForm = fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
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

    fixture.detectChanges();
  });

  it(`formSubmit() should called and expect 'registerForm' should be valid, 
  authService.register() should return response and check 'notify.success()' 
  and 'router.navigate' called.`, () => {
    spyOn(spyRouter, 'navigate');

    component.registerForm.get('username')?.setValue('ramkumar');
    component.registerForm.get('password')?.setValue('Ramkumar@45');
    component.registerForm.get('name')?.setValue('Ramkumar');
    component.registerForm.get('emailAddress')?.setValue('test@gmail.com');
    component.registerForm.get('city')?.setValue('Testtesttest');
    component.registerForm.get('about')?.setValue('Testtesttest');

    expect(component.registerForm.valid).toBeTruthy();

    spyAuthService.register.and.returnValue(
      Rx.of({
        message: 'Profile created successfully',
        status: 200,
      } as UserResponse)
    );

    component.formSubmit();
    expect(spyNotifyService.success).toHaveBeenCalledWith(
      'Profile created successfully'
    );
    expect(spyRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it(`formSubmit() should called and expect 'registerForm' should be valid, 
  authService.register() should return HttpErrorResponse with status 204 and 
  check 'notify.warning()' called.`, () => {
    component.registerForm.get('username')?.setValue('ramkumar');
    component.registerForm.get('password')?.setValue('Ramkumar@45');
    component.registerForm.get('name')?.setValue('Ramkumar');
    component.registerForm.get('emailAddress')?.setValue('test@gmail.com');
    component.registerForm.get('city')?.setValue('Testtesttest');
    component.registerForm.get('about')?.setValue('Testtesttest');

    expect(component.registerForm.valid).toBeTruthy();

    spyAuthService.register.and.returnValue(
      Rx.throwError(
        () =>
          new HttpErrorResponse({
            error: { message: 'test error' },
            status: 204,
          })
      )
    );

    component.formSubmit();

    expect(spyNotifyService.warning).toHaveBeenCalledWith('test error');
  });

  it(`formSubmit() should called and expect 'registerForm' should be valid, 
  authService.register() should return HttpErrorResponse with status 400 and 
  check 'notify.warning()' called.`, () => {
    component.registerForm.get('username')?.setValue('ramkumar');
    component.registerForm.get('password')?.setValue('Ramkumar@45');
    component.registerForm.get('name')?.setValue('Ramkumar');
    component.registerForm.get('emailAddress')?.setValue('test@gmail.com');
    component.registerForm.get('city')?.setValue('Testtesttest');
    component.registerForm.get('about')?.setValue('Testtesttest');

    expect(component.registerForm.valid).toBeTruthy();

    spyAuthService.register.and.returnValue(
      Rx.throwError(
        () =>
          new HttpErrorResponse({
            error: { message: 'test error' },
            status: 400,
          })
      )
    );

    component.formSubmit();
    expect(spyNotifyService.warning).toHaveBeenCalledWith('test error');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should page title conatin "Create account | Online Shopping for Men & Women Shoes"', () => {
    expect(component.pageTitle).toMatch(
      'Create account | Online Shopping for Men & Women Shoes'
    );
  });

  it(`check 'registerForm' valid status should be false`, () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it(`check 'registerForm' valid status should be true`, () => {
    component.registerForm.get('username')?.setValue('ramkumar');
    component.registerForm.get('password')?.setValue('ramkumar@45');
    component.registerForm.get('name')?.setValue('Ramkumar');
    component.registerForm.get('emailAddress')?.setValue('ramkumar@gmail.com');
    component.registerForm.get('about')?.setValue('Testtesttesttest');
    component.registerForm.get('city')?.setValue('test');

    expect(component.registerForm.valid).toBeTruthy();
  });
});
