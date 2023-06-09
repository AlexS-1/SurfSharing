import { Component } from '@angular/core';
import { BackendDataService } from '../backend-data.service';
import { Offer } from '../models/offer';
import { AuthService } from '../auth-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

interface DataEntry {
  id: number;
  title: string;
  description: string;
  userId: string;
  rating?: number;
  pricePH: number;
}

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent {
  dataEntry: DataEntry | undefined;

  constructor(private backend: BackendDataService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  //Load offers template for loading from Firestore
  offer: Offer = {
    id: 0,
    title: '',
    description: '',
    createdByUserID: 0,
    pricePH: 0,
    availability: []
  }

  //Help variables
  toggleMyOffers: string = "Operation my Offers"
  loggedIn = false;
  debugging = false;

  ngOnInit() {
    // Get information on loaded course
    this.route.params.subscribe(async (params) => {
      const id = Number(params['id']);
      this.getOfferForID(id);
      this.checkLogIn(id)
      /*DEPRICATED: Loading from JSON
      this.dataEntry = jsonData.find((entry) => entry.id === parseInt(id, 10));
      this.reviews = commentData.filter((entry) => entry.courseID === parseInt(id, 10));*/
    });
  }

  async getOfferForID(id: number) {
    // Loading courses for current user from firebase backend
    const documentData = await this.backend.getOfferData(id);
    if(documentData.exists()) {
      this.offer.id = documentData.data()['id'];
      this.offer.title = documentData.data()['title'];
      this.offer.description = documentData.data()['description'];
      this.offer.createdByUserID = documentData.data()['createdByUserID'];
      this.offer.pricePH = documentData.data()['pricePH'];
      this.offer.imageURL = documentData.data()['imageURL']
    }
  }

  async checkLogIn(currentOfferID: number) {
    let loggedIn:boolean  = await this.authService.isLoggedIn();
    if (loggedIn) {
      const getCurrentUserName = await this.authService.getCurrentUserName()
      const currentUserData = await this.backend.getUserData(getCurrentUserName);
      if (currentUserData.exists()) {
        const loggedInUserCourses: number[] = currentUserData.data()['favOffers']
        if (loggedInUserCourses.includes(currentOfferID)) {
          this.toggleMyOffers = "- Remove from my Offers"
        } else {
          this.toggleMyOffers = "+ Add to my Offers"
        }
      }
    } else {
      this.toggleMyOffers = "Log in to add to my Offers"
    }
  }

  async toggleUserOffers() {
    this.loggedIn = await this.authService.isLoggedIn();
    if (this.loggedIn && this.toggleMyOffers === "+ Add to my Offers") {
      this.addToUsersOffers()
      this.toggleMyOffers = "- Remove from my Offers";
    } else if (this.loggedIn && this.toggleMyOffers === "- Remove from my Offers") {
      this.removeFromUserOffers()
      this.toggleMyOffers = "+ Add to my Offers";
    } else {
      this.router.navigateByUrl("/log-in")
    }
  }

  async addToUsersOffers() {
    const username = await this.authService.getCurrentUserName();
    this.backend.addToUsersOffers(username, this.offer.id);
    this.router.navigate(['/my-saved-offers']);
  }

  async removeFromUserOffers() {
    const username = await this.authService.getCurrentUserName();
    this.backend.removeFromUserOffers(username, this.offer.id);
  }
}
