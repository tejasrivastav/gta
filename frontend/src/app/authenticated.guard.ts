import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticateService } from './service/authenticate.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isAuthtentic()) {
      return true
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
