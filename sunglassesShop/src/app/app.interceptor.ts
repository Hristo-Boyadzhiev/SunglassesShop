import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthenticationService } from './authentication/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  apiUrl: string = environment.apiUrl

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/api')) {
      request = request.clone({
        url: request.url.replace('/api', this.apiUrl)
      })

      if (this.authenticationService.isAuthenticated) {
        const token = this.authenticationService.getUser()?.accessToken
        if (token) {
          request = request.clone({
            setHeaders: {
              'X-Authorization': token
            }
          })
        }
      }
    }
    return next.handle(request).pipe(
      catchError((responseError: HttpErrorResponse) => {
        // При рестартиране на сървърът се получава нов токен, 
        // но ние продължаваме да си пазим и подаваме старият токен, който е невалиден - статус 403
        if (responseError.status === 403 && responseError.error.message === 'Invalid access token') {
          this.authenticationService.clearLocalStorage()
          // Не връщам празен масив, а връщам нищо
          this.router.navigate(['/home'])
          return []
        } else if (responseError.status === 404) {
          // Създаваме нов Observable, който връща [], който ще е достъпен в next метода на subscribed компонент
          return of(new HttpResponse<any>({ body: [] }));
        } else {
          throw responseError
        }
      })
    )
  }
}

export const AppInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true
}



