import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from './../services/user/user.service';
import { Album } from './../models/album';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
/**
 * DEPRECATED --  unused upvote component -- replaced by LikeComponent
 */
export class UpvoteComponent implements OnInit {
  //  @Input() album: Album;
  //  currentUser: User | null;
 
  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) { }

  clickEvent(): void{
    
  }
  
  ngOnInit(): void {
    //  this.currentUser = this.userService.myUser;
  }

}
