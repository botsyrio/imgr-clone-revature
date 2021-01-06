import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Content } from '@angular/compiler/src/render3/r3_ast';
//import { createConnection } from 'net';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // postFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = 'localhost:8080/project2-server/files/upload';
  //   const formData: FormData = new FormData();
  //   const headers = new HttpHeaders ({
  //     'Content-Type': 'application/x-www-for-urlencoded'
  //   });
  //   const imageCaption: string | null = "";
  //   const albumId: number = 1;
  //   formData.append('user-file', fileToUpload, imageCaption); // filekey to user-file, 3rd arg from fileToUpload.name
  //   return this.httpClient
  //     .post(endpoint, formData, {headers})
  //       .pipe(map (data => {return true}),
  //         catchError((e) => this.handleError(e))
  //       );
//}

// private handleError<T>(operation = 'operation', result?: T) {
//   return (error: any): Observable<T> => {

//     // TODO: send the error to remote logging infrastructure
//     console.error(error); // log to console instead

//     // TODO: better job of transforming error for user consumption
//     console.log(`${operation} failed: ${error.message}`);

//     // Let the app keep running by returning an empty result.
//     return of(result as T);
//   };
// }
  constructor(public httpClient:HttpClient) { }
}
