import { UserService } from './../user/user.service';
import { Album } from './../../models/album';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**
 * service class for communicating with the server on requests that have to do with albums
 */
export class AlbumService {

  /**
   * the URL for the album controllers on the server
   */
  private albumsUrl = 'http://localhost:8080/project2-server/albums';

  /**
   * the URL for the user controllers on the server
   */
  private usersUrl = 'http://localhost:8080/project2-server/users';

  constructor(
    /**
     * instance of the httpClient dependency -- used to send http requests to the server
     */
    private http: HttpClient,
    /**
     * instance of the user service -- used for getting the currently logged-in user
     */
    private userService: UserService
  ) { }

  /**
   * returns an observable for an http request which retrieves the albums that go on the server
   */
  getAlbumsForHomepage(): Observable<any[]> {
    return this.http.get<Album[]>(this.albumsUrl+"/homepageAlbums")
      .pipe(
        tap(_ => console.log('fetched albums')),
        catchError(this.handleError<Album[]>('getAlbumsForHomepage', []))
      );
  }


  /**
   * returns an observable for an http request which retrieves a single album from the server using the album id
   * @param id the id of the album to be retrieved
   */
  getSingleAlbum (id : number): Observable<any> {
    return this.http.get<Album>(this.albumsUrl+"/"+id)
      .pipe(
        tap(_=> console.log('fetched single album')),
        catchError(this.handleError<Album>('getSingleAlbum'))
      );
  }

  /**
   * returns an observable for an http request which retrieves all of the currently-logged-in user's albums
   */
  getAlbumsForMyAlbums(): Observable<any[]>{
    return this.http.get<Album[]>(this.albumsUrl+"/byUser/"+localStorage.getItem('userId'))
      .pipe(
        tap(_ => console.log('fetched albums')),
        catchError(this.handleError<Album[]>('getAlbumsForMyAlbums', []))
      );
  }

  /**
   * returns an observable for an http request which retrieves all of the albums with a particular tag name
   * @param tagName - the tag name to search by
   */
  getAlbumsByTagName(tagName:string): Observable<any[]>{
    return this.http.get<Album[]>(this.albumsUrl+"/byTag/"+tagName)
      .pipe(
        tap(_ => console.log('fetched albums')),
        catchError(this.handleError<Album[]>('getAlbumsByTagName', []))
      );
  }

  /**
   * returns an observable for a post request to the server that creates a new album for the currently signed-in user
   * @param title - the title of the new album
   */
  postNewAlbum(title: string):Observable<any>{
    const formData = new FormData();
    formData.append('albumTitle', title);
    let id: string = ""+localStorage.getItem('userId');
    formData.append('userId', id);

    return this.http.post<any>(this.albumsUrl+"/createAlbum", formData)
    .pipe(
      tap(_ => console.log('created album')),
      catchError(this.handleError<Album[]>('postNewAlbum', []))
    );
  }

  /**
   * returns an observable for a post request to the server that creates a new comment for the currently signed-in user
   * @param myBody the body of the comment to be posted
   * @param myAlbumId the id of the album to be commented on 
   */
  postNewComment(myBody:string, myAlbumId: number):Observable<any>{
    const formData = new FormData();
    formData.append('commentBody', myBody);
    formData.append('albumId', ""+myAlbumId);
    formData.append('userId',""+localStorage.getItem('userId'));

    return this.http.post<any>(this.albumsUrl+"/createComment", formData)
    .pipe(
      tap(_ => console.log('created comment')),
      catchError(this.handleError<Album[]>('postNewComment', []))
    );
  }

  /**
   * returns an observable for a get request to retreieve the currently signed-in user's favorite  albums
   */
  getAlbumsForMyFavorites():Observable<any>{
    return this.http.get<Album[]>(this.albumsUrl+"/userFavorites/"+localStorage.getItem('userId'))
      .pipe(
        tap(_ => console.log('fetched favorite albums')),
        catchError(this.handleError<Album[]>('getFavoriteAlbums', []))
      );
  }

  /**
   * returns an observable for a get request to retreieve a boolean for whether the album is in the user's favorites
   * @param userId the user whose favs are being checked
   * @param albumId the album being checked
   */
  getIsAlbumInMyFavorites(userId:number, albumId:number):Observable<any>{
    return this.http.get<Album[]>(this.albumsUrl+"/isInUserFavorites/"+userId+"/"+albumId)
      .pipe(
        tap(_ => console.log('fetched favorite albums')),
        catchError(this.handleError<Album[]>('getIsAlbumInMyFavorites', []))
      );
  }

  /**
   * returns an observable for a post that favs an album for a user
   * @param myUserId the user faving the album
   * @param myAlbumId the album being faved
   */
  postFavoriteAlbum(myUserId:number, myAlbumId:number):Observable<any>{
    const requestJson={userId: myUserId, favAlbumId: myAlbumId}

    return this.http.post<any>(this.usersUrl+"/favorites", requestJson)
    .pipe(
      tap(_ => console.log('fetched favorite albums')),
      catchError(this.handleError<any>('postFavoriteAlbum', []))
    );

  }
  
  /**
   * returns an observable for a delete request to remove the given album
   * @param imageId the id of the album to be removed
   */
  deleteImageFromAlbum(imageId: Number):Observable<any>{
    
    return this.http.delete<any>(this.albumsUrl + '/delete/' + imageId)
      .pipe(
        tap(_ => console.log('delete success')),
        catchError(this.handleError<Album[]>('failed',[]))
      );
  }

  /**
   * returns an observable for a get request to retreieve a boolean for whether the album was created by the user
   * @param myUserId - the user whose list of created albums is being checked
   * @param myAlbumid - the id of the album being checked
   */
  getDoesAlbumBelongToUser(myUserId: number, myAlbumid:number):Observable<any>{

    return this.http.get<boolean>(this.albumsUrl+"/belongsToUser/"+myUserId+"/"+myAlbumid)
      .pipe(
        tap(_ => console.log('fetched does album belong to user')),
        catchError(this.handleError<boolean>('getDoesAlbumBelongToUser', false))
      );

  }
/**
 * returns an observable for a post request that generates a new tag for a given album
 * @param albumId - the id of the album being tagged
 * @param newAlbumTag - the name of the tag
 */
  addNewTagToAlbum(albumId: number, newAlbumTag: string): Observable<any> {
    const requestUrl = this.albumsUrl + '/createTag/' + albumId;
    return this.http.post<any>(requestUrl, newAlbumTag)
      .pipe(
        tap(_ => console.log('created new tag')),
      );
  }

  /**
   * returns an observable for a get request to retreieve the current number of likes on the given album
   * @param albumId - the album being polled
   */
  getNumLikes(albumId: number): Observable<any>{
    const requestUrl = this.albumsUrl + '/likeCount/' + albumId;
    return this.http.get<any>(requestUrl)
      .pipe(
        tap(_ => console.log('retrieved like count')),
      );
  }

  /**
   * returns an observable for a get request to retrieve a boolean whether the given album belongs to the given user
   * @param userId - the id of the user being queried
   * @param albumId - the id of the album being queried
   */
  getIsAlbumInMyLikes(userId:number, albumId: number):Observable<any>{
    return this.http.get<any>(this.albumsUrl+"/isInUserLikes/"+userId+"/"+albumId)
      .pipe(
        tap(_ => console.log('fetched is in user likes')),
        catchError(this.handleError<Album[]>('getIsAlbumInMyLikes', []))
      );
  }

  postLikeAlbum(myUserId:number, myAlbumId:number):Observable<any>{
    const formData = new FormData();
    formData.append('likedAlbumId', ""+myAlbumId);
    formData.append('userId',""+localStorage.getItem('userId'));

    return this.http.post<any>(this.usersUrl+"/likes", formData)
    .pipe(
      tap(_ => console.log('fetched favorite albums')),
      catchError(this.handleError<any>('postFavoriteAlbum', []))
    );
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
