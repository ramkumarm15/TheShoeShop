import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Login, LoginResponse, Register } from '../Model/auth';
import { UserResponse } from '../Model/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  let loginDetails: Login = {
    username: 'test',
    password: 'testpaswword',
  };
  let loginValidResponse: LoginResponse = {
    accessToken: 'testToken',
    username: 'test',
    userId: 1,
  };

  let userRegistrationData: Register = {
    username: 'ramkumar',
    password: 'Ramkumar@45',
    emailAddress: 'test@gmail.com',
    about: 'test',
    city: 'test',
    name: 'test',
  };
  let userRegistrationSuccessResponse: UserResponse = {
    message: 'Profile created successfully',
    status: 200,
  };
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoicmFta3VtYXIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9naXZlbm5hbWUiOiJSYW1rdW1hciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjc0NDU4NDcyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ0MzIzIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0NDMyMyJ9.LQSu2tqbzuozMy69wY9XFLkEKkaOYj5-BN_kaHzaqps';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, { provide: Router, useValue: mockRouter }],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('login() should called and make HTTP POST request then should return reponse', () => {
    service.login(loginDetails).subscribe({
      next: (res) => {
        expect(res).toBe(loginValidResponse);
      },
    });

    const req = httpMock.expectOne(environment.AUTH_API + '/CreateToken');
    expect(req.request.method).toBe('POST');
    req.flush(loginValidResponse);
  });

  it('register() should called and make HTTP POST request then should return reponse', () => {
    service.register(userRegistrationData).subscribe({
      error: (res) => {
        expect(res).toBe(userRegistrationSuccessResponse);
      },
    });

    const req = httpMock.expectOne(environment.USER_API);
    expect(req.request.method).toBe('POST');
    req.flush(userRegistrationSuccessResponse);
  });

  it('getAuthStatus() should called and return true', () => {
    localStorage.setItem('access_token', token);
    let result = service.getAuthStatus();
    expect(result).toBe(true);
  });

  it('getAuthStatus() should called and return false', () => {
    localStorage.removeItem('access_token');
    let result = service.getAuthStatus();
    expect(result).toBe(false);
  });

  it('getAuthToken() should called and return token', () => {
    localStorage.setItem('access_token', token);
    let result = service.getUserToken();
    expect(result).toEqual(token);
  });

  it('logout() should called and navigate to /login', () => {
    service.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });
});
