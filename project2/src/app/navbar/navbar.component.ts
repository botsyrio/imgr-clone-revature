import { Router } from '@angular/router';
import { UserService } from './../services/user/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
/**
 * view for the topnav
 */
export class NavbarComponent implements OnInit {

  /**
   * represents the id of the currently logged-in user
   */
  @Input() myUser:string|null = null;
  /**
   * event emitted to the parent that user has been logged out
   */
  @Output() onLogout: EventEmitter<number> = new EventEmitter<number>();

  /**
   * constructor for the NavbarComponent
   * @param userService userService - use to set the currently logged-in user
   * @param router router - used to redirect the user on logout
   */
  constructor(public userService:UserService, private router: Router) { }

  ngOnInit(): void {
    
  }

  /**
   * logs the user out
   */
  logout(){
    console.log("I'm clicked off!");
    this.userService.myUser=null;
    localStorage.clear();
    this.router.navigateByUrl("/");
    this.onLogout.emit(0);
  }

  
}
