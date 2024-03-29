import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "src/app/authentication/authentication.service";


@Injectable({
  providedIn: 'root'
})

export class AuthenticatedGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
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
      this.router.navigate(['/login'])
      return false
    }
  }
}