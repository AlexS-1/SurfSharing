import { FormGroup } from '@angular/forms';
import { AuthService } from './../auth-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  email: string = "user1@example.com";
  password: string = "password1";

  constructor(private authService: AuthService) {}



  onSubmit() {
    const isValid = this.authService.login(this.email, this.password);
    /*console.log("onSubmit() function called"); // for debugging
    console.log("email value:", this.email); // for debugging
    console.log("password value:", this.password); // for debugging */
    if (isValid) {
      // perform login
      console.log("perform log-in");  // For DEBUGGGING
    } else {
      // display error message
      console.log("invalid log-in data"); // For DEBUGGGING
    }
  }
}
