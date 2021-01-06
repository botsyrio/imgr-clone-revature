import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '../models/album';
import { User } from '../models/user';
import { Image } from '../models/image'; 
import { NONE_TYPE } from '@angular/compiler';
import { AlbumService } from '../services/album/album.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../models/tag';
import { AlbumComment } from '../models/AlbumComment';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.css']
})
/**
 * component for displaying a full album
 */
export class AlbumViewComponent implements OnInit {

  /**
   * the album to be displayed in full
   */
    albumFromHere: Album = new Album(-1, '', null, [], 0, new Date(), [], []);


    /**
     * retrieves the album to be displayed from the server and molds it into the Album model
     */
    public getAlbum() {
      if (this.route.snapshot.paramMap.get('id')) { // did not like the possibility of id being null, this condition verifies it isnt
        const id =  this.route.snapshot.paramMap.get('id');
        this.albumService.getSingleAlbum(Number(id))
          .subscribe(album => {
            //this.album = albumFromServer
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
              for(let tag of album.tagList){
                let tagId = tag.id;
                let tagName = tag.tagName;
                tags.push(new Tag(tagId, tagName));
              }
      
              let comments: AlbumComment[] =[];
              for(let comment of album.commentSet){
                let commentId: number = comment.id;
                let userCommenter = null;
                let dateSubmitted: Date = new Date(comment.dateSubmitted);
                let commentBody = comment.body;
                comments.push(new AlbumComment(commentId, userCommenter, dateSubmitted, commentBody))
              }
      
              this.albumFromHere = new Album(id, title, user, images, upvoteCount, dateCreated, tags, comments)
              console.log(this.albumFromHere)
            });
      }
      
    }

    /**
     * constructor for the AlbumViewComponent
     * @param albumService - the album service - used to communicate with the server
     * @param route - representation of the current route
     */
  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {  }

  /**
   * runs as soon as the AlbumViewComponent has been initialized -- calls getAlbum() to retrieve the album from the server
   */
  ngOnInit(): void {
    this.getAlbum();
  }

  /**
   * adds a newly-created comment emitted from the CommentsComponent to the album's comment list
   * @param newComment the newly-created comment to be added to the album model
   */
  submitNewComment(newComment: AlbumComment){
    this.albumFromHere.comments.push(newComment);
  }

}
