import { AlbumService } from './../services/album/album.service';
import { UserService } from './../services/user/user.service';
import { AlbumComment } from './../models/AlbumComment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
/**
 * component for displaying and submitting new comments for a given album
 */
export class CommentsComponent implements OnInit {

  /**
   * the body of a new comment to be submitted
   */
  newCommentBody: string="";
  /**
   * the id of the currently-signed in user
   */
  myUserId = localStorage.getItem('userId');

  /**
   * the list of an album's comments to be displayed
   */
  @Input() comments: AlbumComment[]=[];
  /**
   * the id for the current album
   */
  @Input() albumId: number=0;
  /**
   * event emitter to let the parent know when a new comment has been successfully created
   */
  @Output() onSubmitNewComment: EventEmitter<AlbumComment> = new EventEmitter<AlbumComment>();

  /**
   * Constructor for the CommentsComponent
   * @param userService - user service - used for information pertaining to the currently signed-in user
   * @param albumService - album service - used to communicate with the server
   */
  constructor(
    public userService: UserService,
    public albumService: AlbumService
  ) { }

  ngOnInit(): void {

  }

  /**
   * if the comment submission form is invalid, returns. otherwise posts a new comment and emits it to the parent
   * @param form - representation of the comment submission form
   */
  onSubmitClick(form:any){
    if(this.newCommentBody.length < 1 || this.newCommentBody.length >= 1000 || !this.myUserId || +this.myUserId === 0 ||this.albumId===0) 
      return;
    this.albumService.postNewComment(this.newCommentBody, this.albumId)
      .subscribe(commentJson => {
        
        let commentId: number = commentJson.id;
        let userCommenter = null;
        let dateSubmitted: Date = new Date(commentJson.dateSubmitted);
        let commentBody = commentJson.body;

        let myComment = new AlbumComment(commentId, userCommenter, dateSubmitted, commentBody);
        console.log(myComment);
        this.onSubmitNewComment.emit(myComment);
      })
  }

  /*
  //USE THIS METHOD WHEREVER THE COMMENT COMPONENT GOES
  submitNewComment(newComment: AlbumComment){
    this.album.comments.push(newComment);
  }

  AND PUT THIS IN THE TEMPLATE 
  <app-comments [comments]="album.comments" [albumId]="album.id" (onSubmitNewComment)="submitNewComment($event)"></app-comments>
        
  */

}
