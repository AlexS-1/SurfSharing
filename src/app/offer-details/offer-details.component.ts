import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


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
export class OfferDetailsComponent implements OnInit {
  dataEntry: DataEntry | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }
}