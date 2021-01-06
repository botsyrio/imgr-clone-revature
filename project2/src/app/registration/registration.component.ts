import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
/**
 * view for registering a new user
 */
export class RegistrationComponent implements OnInit {

  /**
   * the contents of the email field on the form
   */
   email: string = '';
   /**
    * the contents of the password field on the form
    */
   password: string = '';

   /**
    * Constructor for the RegistrationComponent
    * @param router the router object - used to redirect the user on successful registration
    * @param http the httpClient - used to communicate with the server
    */
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
  }

  /**
   * attempts to register the user with the given credentials
   */
  onSubmit() {
    const request = {
      email: this.email,
      password: this.password
    };

    console.log(request);
    this.http.post('http://localhost:8080/project2-server/users/createUser', request)
      .subscribe(response => {
        this.router.navigate(['/login']);
      },
        error => console.log('Error during account sign up'));
  }
}
