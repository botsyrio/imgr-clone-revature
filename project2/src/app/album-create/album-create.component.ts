import { Router } from '@angular/router';
import { AlbumService } from './../services/album/album.service';
import { UserService } from './../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album-create',
  templateUrl: './album-create.component.html',
  styleUrls: ['./album-create.component.css']
})

/**
 * component for the album creation form
 */
export class AlbumCreateComponent implements OnInit {
  /**
   * the title of the album to be created
   */
  albumTitle: string="";
  /**
   * string id of the currently logged-in user or null if there is no user logged in
   */
  myUserId = localStorage.getItem('userId')

  /**
   * constructor for AlbumCreateComponent
   * @param albumService - album service - used to communicate with the server
   * @param router - router object - used to navigate the user to the album edit page after they've created the new album
   */
  constructor(
    private albumService: AlbumService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  /**
   * method that runs on form submission -- returns immediately if any conditions for album creation fail
   * (logged in user invalid/album title invalid length); otherwise makes the post request to create the album
   */
  onSubmitClick(form:any):void{
    if(this.albumTitle.length<1 || this.albumTitle.length >=250 || !this.myUserId || +this.myUserId === 0) return;
    this.albumService.postNewAlbum(this.albumTitle).subscribe(resultId => this.router.navigateByUrl('/album/'+resultId+"/edit"));
  }

}
