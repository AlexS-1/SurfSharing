import { Component } from '@angular/core';
import { BackendDataService } from '../backend-data.service';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-browse-offers',
  templateUrl: './browse-offers.component.html',
  styleUrls: ['./browse-offers.component.css']
})
export class BrowseOffersComponent {
  constructor(private backend: BackendDataService) {

  }
  
  offers: Offer[] = []

  ngOnInit() {
    this.loadOffers()
  }

  async loadOffers() {
    this.offers = await this.backend.getAllOffers()
  }
}
