import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * compnent for logging in
 */
export class LoginComponent implements OnInit {

  /**
   * event emitter to send the id of the newly signed-in user to the parent component
   */
  @Output() onLogin: EventEmitter<number> = new EventEmitter<number>();

  /**
   * representation of the current user
   */
   currentUser: User;

   /**
    * boolean represents whether the form has been submitted or not
    */
   submitted = false;


   /**
    * constructor for the LoginComponent
    * @param userService userService - used to log in the potential user
    * @param router router - used to redirect the user after login
    */
  constructor(private userService: UserService, private router: Router) {
    if (userService.myUser) {
      // return to homepage
    }

    this.currentUser = {} as User;
  }

  ngOnInit(): void {
  }


  /**
   * submits the contents of the form and attempts to sign in the user with the given credentials
   */
  onSubmit() {
    this.submitted = true;
    this.userService.login(this.currentUser)
      .subscribe(response => {
        this.currentUser = response;
        // console.log('This is the User in login component', this.currentUser);
        localStorage.clear();
        localStorage.setItem('userId', String(this.currentUser.id));
        localStorage.setItem('userEmail', this.currentUser.email);
        this.onLogin.emit(this.currentUser.id);
        this.router.navigate(['/']);
      },
        error => console.log('Something went wrong during login'));
  }

}
