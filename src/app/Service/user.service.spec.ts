import { HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import * as Rx from 'rxjs';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpReqInterceptor } from '../Interceptor/httpreq.interceptor';
import { User, UserResponse } from '../Model/user';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { ErrorInterceptor } from '../Interceptor/error.interceptor';

describe('UserService', () => {
  let service: UserService;
  let controller: HttpTestingController;
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  let authServiceMock = {
    getUserToken: () => {
      return token;
    },
    logout: () => { }
  };

  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicmFta3VtYXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJSYW1rdW1hciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjc0NDU4NDcyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzIzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0NDMyMyJ9.LQSu2tqbzuozMy69wY9XFLkEKkaOYj5-BN_kaHzaqps';

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

  let userUpdatedDetails = {
    username: 'test',
    name: 'test',
    emailAddress: 'test@gmail.com',
    about: 'test',
    city: 'test',
    gender: 'test',
    age: 123,
    mobileNumber: 123,
  };

  let userValidResponse: UserResponse = {
    message: 'Password Updated',
    status: 200,
  };

  let userPasswordUpdateDetails = {
    oldPassword: 'testtesttest',
    newPassword: 'testtesttest',
    confirmPassword: 'testtesttest',
  };


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpReqInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
      ],
    }).compileComponents();

    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  }));

  afterEach(() => {
    controller.verify();
  });

  it('getMe() should make HTTP GET request and return response', () => {
    service.getMe().subscribe({
      next: (res) => {
        expect(res).toBe(userDetails);
      },
    });

    let req = controller.expectOne(`${environment.USER_API}/GetMe`);
    expect(req.request.method).toEqual('GET');
    req.flush(userDetails);
  });

  it('getMe() should make HTTP GET request and return 401 HttpErrorResponse', () => {
    spyOn(authServiceMock, 'logout')
    service.getMe().subscribe({
      error: (err: HttpErrorResponse) => {
        console.log(err)
      }
    });

    let req = controller.expectOne(`${environment.USER_API}/GetMe`)

    req.flush('', { status: 401, statusText: 'Unauthorized' })
    expect(authServiceMock.logout).toHaveBeenCalled()
  });

  it('updateUserPassword() should make HTTP PATCH request and return response', () => {
    userValidResponse.message = 'Password updated'
    service.updateUserPassword(userUpdatedDetails).subscribe({
      next: (res) => {
        expect(res).toBe(userValidResponse);
      },
    });

    let req = controller.expectOne(`${environment.USER_API}/update/password`);
    expect(req.request.method).toEqual('PATCH');
    req.flush(userValidResponse);
  });

  it('updateUserData() should make HTTP PUT request and return response', () => {
    userValidResponse.message = 'Profile updated';
    service.updateUserData(userPasswordUpdateDetails).subscribe({
      next: (res) => {
        expect(res).toBe(userValidResponse);
      },
    });

    let req = controller.expectOne(`${environment.USER_API}/update`);
    expect(req.request.method).toEqual('PUT');
    req.flush(userValidResponse);
  });

  it('get and set id() should initialize value and return value', () => {
    localStorage.setItem('access_token', token);
    expect(service.id).toEqual(2);
  });

  it('get and set preferredUserName() should initialize value and return value', () => {
    localStorage.setItem('access_token', token);

    expect(service.preferredUserName).toEqual('Ramkumar');
  });

  it('get and set username() should initialize value and return value', () => {
    localStorage.setItem('access_token', token);

    expect(service.username).toEqual('ramkumar');
  });

  it('getMe() should make HTTP GET request and should return response', () => {
    localStorage.setItem('access_token', token);

    service.getMe().subscribe({
      next: (res) => {
        expect(res).toBe(userDetails);
        service.userData = res;
      },
    });

    let req = controller.expectOne(`${environment.USER_API}/GetMe`);
    expect(req.request.method).toEqual('GET');
    req.flush(userDetails);

    expect(service.userData).toEqual(userDetails);
  });
});
