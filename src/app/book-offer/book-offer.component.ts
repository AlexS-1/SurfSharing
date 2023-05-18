import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendDataService } from '../backend-data.service';
import { AuthService } from '../auth-service.service';
import { Offer } from '../models/offer';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-offer',
  templateUrl: './book-offer.component.html',
  styleUrls: ['./book-offer.component.scss']
})
export class BookOfferComponent {
  
  form: FormGroup;
  weekdays: Array<any> = [
    { name: 'M', value: 'Mon' },
    { name: 'T', value: 'Tue' },
    { name: 'W', value: 'Wed' },
    { name: 'T', value: 'Thu' },
    { name: 'F', value: 'Fri' },
    { name: 'S', value: 'Sat' },
    { name: 'S', value: 'Sun' }
  ];

  loggedIn = false;
  toggleBookOffer: string = "Log in to Book Offer"

  constructor(private backend: BackendDataService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
      this.form = fb.group({selectedWeekdays:  new FormArray([])});
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
      this.checkUserBooking();
      this.getOfferForID(id);
      /*DEPRICATED: Loading from JSON
      this.dataEntry = jsonData.find((entry) => entry.id === parseInt(id, 10));
      this.reviews = commentData.filter((entry) => entry.courseID === parseInt(id, 10));*/
    });
  }

  async checkUserBooking() {
    if (!this.loggedIn) {
      this.toggleBookOffer = "Log in to Book Offer"
    } else {
      this.toggleBookOffer = "Book Offer"
    }
  }

  async toggleUserBooking() {
    this.loggedIn = await this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.toggleBookOffer = "Book Offer";
    } else {
      this.toggleBookOffer = "Log-In to Book Offer";
      this.router.navigateByUrl("log-in");
    }
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

  onCheckboxChange(event: any) {
    const selectedWeekdays = (this.form.controls['selectedWeekdays'] as FormArray);
    if (event.target.checked) {
      selectedWeekdays.push(new FormControl(event.target.value));
    } else {
      const index = selectedWeekdays.controls
      .findIndex(x => x.value === event.target.value);
      selectedWeekdays.removeAt(index);
    }
  }
  
  submit() {
    console.log(this.form.value);
  }
}
