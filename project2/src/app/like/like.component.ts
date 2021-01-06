import { Component, Input, OnInit } from '@angular/core';
import { AlbumService } from '../services/album/album.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
/**
 * component for displaying an album's likes and allowing a signed-in user to like the album
 */
export class LikeComponent implements OnInit {

  
  /**
   * the id of the album whose like-logic is being handled
   */
  @Input() albumId:number=-1;
  /**
   * the id of the currently signed-in user
   */
  myUserId:string|null = null;
  /**
   * the number of likes the current logic has
   */
  numLikes:number=0;
  /**
   * boolean representation of whether the currently signed-in user has liked the album
   */
  isLiked:boolean=false;

  /**
   * Constructor for LikeComponent
   * @param albumService - album service - used to communicate with the server
   */
  constructor(
    private albumService: AlbumService
  ) { }

  /**
   * runs as soon as the LikeComponent has been initialized 
   * -- sets the currently signed-in user, retrieves the number of likes if the album id is set properly, 
   * and checks whether the user has liked the album if they're signed in
   */
  ngOnInit(): void {
    this.myUserId = localStorage.getItem('userId');
    if(this.albumId !== -1){
      this.getNumLikes();
      if(this.myUserId){
        this.checkIsAlbumInLikes();
      }
    }
  }

  /**
   * runs as soon as an input field has been changed 
   * -- sets the currently signed-in user, retrieves the number of likes if the album id is set properly, 
   * and checks whether the user has liked the album if they're signed in
   */
  ngOnChanges(){
    if(this.albumId !== -1){
      this.getNumLikes();
      if(this.myUserId){
        this.checkIsAlbumInLikes();
      }
    }
  }

  /**
   * retrieves the number of total likes for the current albm
   */
  getNumLikes():void{
    this.albumService.getNumLikes(this.albumId)
      .subscribe(result=>{
        this.numLikes = result;
      });
  }

  /**
   * checks whether the currently signed-in user has liked the album
   */
  checkIsAlbumInLikes(): void{
    if(this.myUserId)
      this.albumService.getIsAlbumInMyLikes(+this.myUserId, this.albumId)
      .subscribe(result=>{
        if(result === true)
          this.isLiked = true;
        
      });
  }

  /**
   * the currently signed-in user likes the album
   */
  likeAlbum():void{
    if(!this.isLiked && this.myUserId){
      this.numLikes++;
      this.isLiked = true;
      this.albumService.postLikeAlbum(+this.myUserId, this.albumId)
      .subscribe(result=>{
      })
    }
  }

}
