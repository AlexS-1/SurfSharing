import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from './../auth-service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  first_name = 'User';
  surname = 'Lastname';
  username = 'user1';
  date_of_birth = '';
  email = 'user1@example.com';
  password = 'UserPassword@1';
  repeat_password = 'UserPassword@2';

  passwordValidity = false;

  constructor(private authService: AuthService) {}

  checkValidityPasswords(password: any) {
    if (this.password == this.repeat_password) {
      this.passwordValidity = true;
    } else {
      this.passwordValidity = false;
    }
    
  }

  onSubmit() {
    //TODO Submit information to .JSON
  }
}
