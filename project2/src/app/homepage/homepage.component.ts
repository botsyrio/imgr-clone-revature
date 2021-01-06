import { Tag } from './../models/tag';
import { AlbumComment } from './../models/AlbumComment';
import { Album } from './../models/album';
import { Image } from './../models/image';
import { User } from 'src/app/models/user';
import { AlbumService } from './../services/album/album.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
/**
 * Component representing the homepage view
 */
export class HomepageComponent implements OnInit {

  /**
   * the set of albums to be displayed on the homepage
   */
  homepageAlbums: any[] = [];

  /**
   * Constructor for the HomepageComponent
   * @param albumService - album service - used to communicate with the server
   */
  constructor(
    private albumService: AlbumService
  ) { }

  /**
   * runs as soon as the HomepageComponent has been initialized
   * -- attempts to retrieve the the albums to be displayed from the server
   */
  ngOnInit(): void {
    this.getHomepageAlbums();
  }

  /**
   * attempts to retrieve the albums to be displayed from the server, mold them into the Album model and set them to homepageAlbums
   */
  public getHomepageAlbums(): void{    
    
    this.albumService.getAlbumsForHomepage()
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

      this.homepageAlbums = albumsArray;
      console.log("HOMEPAGE")
      console.log(this.homepageAlbums)
    })
    
  }

  

}
