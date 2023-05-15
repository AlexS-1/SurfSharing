import { Component, OnInit } from '@angular/core';
import { BackendDataService } from '../backend-data.service';
import { AuthService } from '../auth-service.service';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent {
  offers: Offer[] = [];
  offerIDs: number[] = [];
  selectedCourseIds = [1, 2]; // Liste der ausgewählten Kurs-IDs

  constructor(private backend: BackendDataService, private auth: AuthService) {

  }

  ngAfterViewInit(): void {
    // Call loading function
    this.loadFavOffers();
  }

  private async loadFavOffers() {
    const currentUN = await this.auth.getCurrentUserName()
    const currentUser = await this.backend.getUserData(currentUN);
    if (currentUser.exists()) {
      // Get data from DocumentData
      this.offerIDs = currentUser.data()['favOffers'];
    }
    this.offers =  await this.backend.getMyOffers(this.offerIDs);
    console.log(this.offers);
  }
}
