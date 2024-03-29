import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/authentication/authentication.service";


@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAdmin = this.authenticationService.isAdmin
    const isAuthenticated = this.authenticationService.isAuthenticated

    if (isAdmin) {
      return true
    } else if (isAuthenticated) {
      this.router.navigate(['/home'])
      return false
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }
}