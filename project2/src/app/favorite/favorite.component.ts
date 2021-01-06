import { AlbumService } from './../services/album/album.service';
import { Component, Input, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
/**
 * component for favoriting an album and representing whether the user has already favorited the album
 */
export class FavoriteComponent implements OnInit {

  /**
   * the id of the current album - passed in by the parent component
   */
  @Input() albumId:number=-1;
  /**
   * string reprentation of the id for the currently signed-in user
   */
  myUserId:string|null = null;
  /**
   * boolean representation of whether the currently signed-in user has already favorited the current album
   */
  isFavorited:boolean=false;

  /**
   * Constructor for the FavoriteComponent
   * @param albumService - album service - used to communicate with the server
   */
  constructor(
    private albumService: AlbumService
  ) { }

  /**
   * runs as soon as the FavoriteComponent has been initialized -- checks whether the album is in the currently signed-in user's favorites
   */
  ngOnInit(): void {
    this.myUserId = localStorage.getItem('userId');
    if(this.myUserId && this.albumId!==-1)
      this.checkIsAlbumInFavorites();
  }

  /**
   * runs as soon as a change occurs in the input fields of  FavoriteComponent -- 
   * checks whether the album is in the currently signed-in user's favorites
   */
  ngOnChanges(){
    if(this.myUserId && this.albumId!==-1)
      this.checkIsAlbumInFavorites();
  }

  /**
   * checks whether the album is in the currently signed-in user's favorites
   */
  checkIsAlbumInFavorites(): void{
    if(this.myUserId)
      this.albumService.getIsAlbumInMyFavorites(+this.myUserId, this.albumId)
      .subscribe(result=>{
        if(result === true)
          this.isFavorited = true;
        
      });
  }

  /**
   * favorites the album for the currently signed-in user
   */
  favoriteAlbum():void{
    if(!this.isFavorited && this.myUserId){
      this.isFavorited = true;
      this.albumService.postFavoriteAlbum(+this.myUserId, this.albumId)
      .subscribe(result=>{
      })
    }
  }

}
