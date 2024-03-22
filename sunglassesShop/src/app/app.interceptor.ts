import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  apiUrl: string = environment.apiUrl

  constructor(private authenticationService: AuthenticationService) { }

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
      // catchError((responseError: HttpErrorResponse) => {
        // При тази грешка изтривам токена и не хвърлям нищо
        // Във всички други случаи хвърлям грешката нататък и тя се обработва от съответния компонент
      //   if (responseError.status === 403 &&
      //     responseError.error.message === 'Invalid access token') {
      //     localStorage.removeItem('auth')
      //     throw null
      //   } else {
      //     throw responseError
      //   }
      // })
    )
  }
}

export const AppInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true
}



