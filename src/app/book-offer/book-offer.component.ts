import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendDataService } from '../backend-data.service';
import { AuthService } from '../auth-service.service';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-book-offer',
  templateUrl: './book-offer.component.html',
  styleUrls: ['./book-offer.component.scss']
})
export class BookOfferComponent {
  constructor(private backend: BackendDataService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  offer: Offer = {
    id: 0,
    title: '',
    description: '',
    createdByUserID: 0,
    pricePH: 0
  }
  
  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const id = Number(params['id']);
      this.getOfferForID(id);
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
}
