import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../Service/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let spyService: AuthService;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/cookies' };
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, { provide: Router, useValue: routerMock }],
    });
    guard = TestBed.inject(AuthGuard);
    spyService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate() should return false', () => {
    spyOn<AuthService>(spyService, 'getAuthStatus').and.returnValue(false);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
  });

  it('canActivate() should return true', () => {
    spyOn<AuthService>(spyService, 'getAuthStatus').and.returnValue(true);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
