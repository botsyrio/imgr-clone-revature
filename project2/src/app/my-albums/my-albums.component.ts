import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { AlbumComment } from '../models/AlbumComment';
import { Image } from './../models/image';
import { Tag } from '../models/tag';
import { AlbumService } from '../services/album/album.service';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
/**
 * view for display currently logged-in user's albums
 */
export class MyAlbumsComponent implements OnInit {

  /**
   * the list of the currently logged-in user's albums
   */
  myAlbums: Album[] = [];
  /**
   * constructor for MyAlbumsComponent
   * @param albumService album service - used for communicating with the server
   */
  constructor(
    private albumService: AlbumService
  ) { }

  /**
   * runs as soon the MyAlbumsComponent is initialized -- attempts to retrieve the currently logged-in user's albums
   */
  ngOnInit(): void {
    this.getMyAlbums();
  }

  /**
   * attempts to retrieve the currently logged-in user's albums, mold them into the Album model and assign them to myAlbums
   *
   */
  public getMyAlbums(): void{    
    
    this.albumService.getAlbumsForMyAlbums()
    .subscribe(albums => {

      let albumsArray: Album[] = []

      for(let album of albums){
        let id: number = album.id;

        let title: string = album.albumTitle;

        let user = null;

        let images: Image[] = []
        for(let image of album.imageSet){
          let imageId: number = image.id;
          let imageURL: string = image.imagePath;
          let caption: string = image.caption;
          let dateSubmitted: Date = new Date(image.dateSubmitted)
          images.push(new Image(imageId, imageURL, caption, dateSubmitted))
        }

        //change this when we get the upvote count
        let upvoteCount = 0;

        let dateCreated: Date = new Date(album.dateCreated)

        //change this when we implement tags
        let tags: Tag[] = [];

        let comments: AlbumComment[] =[];
        for(let comment of album.commentSet){
          let commentId: number = comment.id;
          let userCommenter = null;
          let dateSubmitted: Date = new Date(comment.dateSubmitted);
          let commentBody = comment.body;
          comments.push(new AlbumComment(commentId, userCommenter, dateSubmitted, commentBody))
        }

        albumsArray.push(new Album(id, title, user, images, upvoteCount, dateCreated, tags, comments))
      }

      this.myAlbums = albumsArray;
      console.log("My Users")
      console.log(this.myAlbums)
    })
    
  }

  

}
