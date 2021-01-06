import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * route guard used to block users out of pages if they haven't been logged-in
 */
export class LoggedInGuard implements CanActivate {
  /**
   * returns true if the user can activate the route, false otherwise.
   * will return true if the user is validly logged in
   * @param route - route the user is trying to activate
   * @param state - the state of the router
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let myUserIdString:string|null = localStorage.getItem('userId');
      let myUserId:number = 0;
      if(myUserIdString)
        myUserId = +myUserIdString;

      if(!myUserId)
        return false;
      return true;
  }
  
}
