import * as core from '@angular/core';
import * as http from '@angular/common/http';
import * as rxjs from 'rxjs';
import * as authService from '../Service/auth.service';

@core.Injectable()
export class ErrorInterceptor implements http.HttpInterceptor {
  constructor(private auth: authService.AuthService) {}

  intercept(
    request: http.HttpRequest<unknown>,
    next: http.HttpHandler
  ): rxjs.Observable<http.HttpEvent<unknown>> {
    return next.handle(request).pipe(
      rxjs.catchError((err) => {
        switch (err.status) {
          case 401:
            this.auth.logout();
            break;
        }
        return rxjs.throwError(() => new http.HttpErrorResponse(err));
      })
    );
  }
}
