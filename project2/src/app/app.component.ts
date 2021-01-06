import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * root component of the application
 */
export class AppComponent {
  /**
   * title of the application
   */
  title = 'project2';
  /**
   * string representation of the id of the currently logged-in user
   */
  userId:string|null = null;

  /**
   * runs when root component is initialized -- gets user id from local storage
   */
  ngOnInit(){
   this.userId = localStorage.getItem('userId')
  }

  /**
   * logs in user -- responds to login event
   */
  loginResponse():void{
    console.log('app component caught onLogin')
    this.userId = localStorage.getItem('userId')
  }
  /**
   * logs out user -- responds to logout event
   */
  logoutResponse():void{
    console.log('app component caught onLogout');
    this.userId = localStorage.getItem('userId');
  }
}
