import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { BackendDataService } from '../backend-data.service';
import { User } from '../models/user';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  constructor(private backend: BackendDataService, private authService: AuthService) { }

  offers: Offer[] = []

  user: User = {
    id: '',
    username: '',
    firstName: '',
    surname: '',
    email: '',
    dateOfBirth: '',
    password: '',
    favOffers: []
  };

  ngAfterViewInit() {
    this.updateUserInformation();
  }

  async updateUserInformation() {
    this.user.username = await this.authService.getCurrentUserName();

    const user = await this.backend.getUserData(this.user.username);
    if (user.exists()) {
      this.user.firstName = user.data()['firstName'];
      this.user.surname = user.data()['surname'];
      this.user.email = user.data()['email'];
      this.user.dateOfBirth = user.data()['dateOfBirth'];
    }

    /*const evaluations = await this.backend.getEvaluationsForUser(this.user.username);
    evaluations.forEach((doc) => {
      const offer: Offer = {
        id: doc.data()['id'],
        title: doc.data()['title'],
        description: doc.data()['description'],
        createdByUserID: doc.data()['createdByUserID'],
        imageURL: doc.data()['imageURL'],
        pricePH: doc.data()['pricePH']
      }
      this.offers.push(offer);
    });*/
  }
}
