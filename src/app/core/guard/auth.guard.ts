import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateChildGuard implements CanActivateChild {

  constructor(
    public router: Router,
    public authService: AuthService){}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(childRoute);
    console.log(state);

    if (!this.authService.isAuthenticated()){
      this.router.navigate(['']);
      return true;
    }
  

    return true;
  }
}