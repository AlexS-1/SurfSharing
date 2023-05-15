import { Component } from '@angular/core';
import { BackendDataService } from '../backend-data.service';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {

  constructor(private backend: BackendDataService) {

  }

  offers: Offer[] = []
}
