import { Component } from '@angular/core';
import { BackendDataService } from '../backend-data.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  firstName = 'User';
  surname = 'Lastname';
  username = 'user1';
  dateOfBirth = '2000-01-01';
  email = 'user1@example.com';
  password = 'UserPassword@!1';
  repeatedPassword = 'UserPassword@!2';

  //Output to form
  message = '';

  //Other variables
  passwordValidity = false;

  constructor(private backendDataService: BackendDataService) {

  }

  checkValidityPassword(password: any) {
    this.message = "The password must match the following criteria: ";
    if(!this.password.match(".*\\d.*"))
      this.message += '\n- at least one number';
    if(!this.password.match(".*[a-z].*"))
      this.message += '\n- at least a lowercase letter';
    if(!this.password.match(".*[A-Z].*"))
      this.message += '\n- at least an uppercase letter';
    if(!this.password.match("(?=.*[@$!%*?&])"))
      this.message += '\n- at least a special character such as: @$!%*?&';
    if ((!(/^(.{8,32})$/.test(this.password)))) {
      this.message += '\n- the password must between 8 and 32 characters'
    }
   }

  checkMatchingPasswords(password: any) {
    if (this.password == this.repeatedPassword) {
      this.passwordValidity = true;
      this.message = ''
    } else {
      this.passwordValidity = false;
      this.message = 'Please enter matching passwords'
    }
  }

  async onSubmit() {
    const user: User = {
      username: this.username,
      firstName: this.firstName,
      surname: this.surname,
      dateOfBirth: this.dateOfBirth,
      email: this.email,
      password: this.password,
      id: "",
      favOffers: []
    }
    this.message = await this.backendDataService.addUser(user);
  }
}
