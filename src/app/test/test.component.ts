import { Component } from '@angular/core';
import { BackendDataService } from '../backend-data.service';
import offers from '../../assets/content/offers.json'
import { Offer } from '../models/offer';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  constructor(private backend: BackendDataService) {

  }

  async jsonToFirebase() {
    for(let i = 0; i < offers.length; i++) {
      let offer: Offer = offers[i]
      await this.backend.addOffer(offer);
    }
  }
}
