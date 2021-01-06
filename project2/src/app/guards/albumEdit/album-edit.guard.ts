import { AlbumService } from './../../services/album/album.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/**
 * route guard that determines whether the user can access the given album edit page
 */
export class AlbumEditGuard implements CanActivate {

  /**
   * constructor for the AlbumEditGuard
   * @param albumService - album service - used to communicate with the server
   */
  constructor(private albumService: AlbumService){}

  /**
   * determines whether the user can activate the current route -- lets them through if there is a valid current user AND
   * that user created the album in question
   * @param route - the the user is trying to access
   * @param state - the state of the router
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let myUserIdString:string|null = localStorage.getItem('userId');
      let myUserId:number = 0;
      if(myUserIdString)
        myUserId = +myUserIdString;
      let albumIdString = route.paramMap.get('id');
      let albumId = 0;
      if(albumIdString)
        albumId = +albumIdString;

      if(!myUserId)
        return false;
      
      return this.albumService.getDoesAlbumBelongToUser(myUserId, albumId);
  }
  
}
