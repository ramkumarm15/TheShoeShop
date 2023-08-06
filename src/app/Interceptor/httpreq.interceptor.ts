import * as core from '@angular/core';
import * as http from '@angular/common/http';
import * as rxjs from 'rxjs';
import * as authService from '../Service/auth.service';

@core.Injectable({
  providedIn: 'root',
})
export class HttpReqInterceptor implements http.HttpInterceptor {
  token: any = '';

  constructor(private auth: authService.AuthService) {}

  intercept(
    request: http.HttpRequest<unknown>,
    next: http.HttpHandler
  ): rxjs.Observable<http.HttpEvent<unknown>> {
    this.token = localStorage.getItem('access_token') || null;
    // console.log('AccessToken:', this.token)

    if (this.token != null) {
      const tokenizeReq = request.clone({
        headers: request.headers.set('Authorization', `bearer ${this.token}`),
      });
      return next.handle(tokenizeReq);
    }

    return next.handle(request);
  }
}
