import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/authentication/authentication.service";


@Injectable({
  providedIn: 'root'
})

export class GuestGuard implements CanLoad {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuthenticated = this.authenticationService.isAuthenticated

    if (isAuthenticated) {
      this.router.navigate(['/home'])
      return false
    } else {
      return true
    }
  }
}

