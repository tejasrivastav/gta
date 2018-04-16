import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticateService } from './service/authenticate.service';

@Injectable()
export class UserResolver implements Resolve<Observable<any>> {

  constructor(
    private authService: AuthenticateService
  ) {
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.authService.getUser();
  }
}