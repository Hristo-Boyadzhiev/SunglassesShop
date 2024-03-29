import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/authentication/authentication.service";


@Injectable({
  providedIn: 'root'
})

export class AuthenticatedGuard implements CanLoad {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.authenticationService.isAuthenticated
    const isAdmin = this.authenticationService.isAdmin

    if (isAuthenticated) {
      if (isAdmin) {
        this.router.navigate(['/home'])
        return false
      } else {
        return true
      }
    } else {
      this.router.navigate(['/auth/login'])
      return false
    }
  }
}