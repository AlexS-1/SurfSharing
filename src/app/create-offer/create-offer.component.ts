import { Component } from '@angular/core';
import { ImageUploadFormComponent } from '../image-upload-form/image-upload-form.component';
import { AuthService } from '../auth-service.service';
import { BackendDataService } from '../backend-data.service';
import { Offer } from '../models/offer';
import { FileUploaderService } from '../file-uploader.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent {
  constructor (
    private auth: AuthService,
    private backend: BackendDataService,
    private fileUpload: FileUploaderService,
    private router: Router
    ) {

  }

  //Input of form
  offerPrice = "";
  offerTitle = "";
  offerDescription = "";

  //Output to form
  message = "";

  //Help variables
  debugging = false;
  imageURL = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"

  updateOfferInformation() {

  }

  async addOffer() {
    const isLoggedIn = await this.auth.isLoggedIn()
    if (!isLoggedIn) {
      this.message = "Please log-in to add courses!"
    } else {
      const username: string = await this.auth.getCurrentUserName()
      const userData = await this.backend.getUserData(username)
      let currUserID: number = -1;
      if (userData.exists()) {
        currUserID = userData.data()['id']
        if (this.debugging) {
          console.log(currUserID);
        }
      }
      if (this.fileUpload.currURL != "") {
        this.imageURL = this.fileUpload.currURL;
      }
      const offer: Offer = {
        id: Number(this.offerPrice),
        title: this.offerTitle,
        description: this.offerDescription,
        createdByUserID: currUserID,
        pricePH: Number(this.offerPrice),
        imageURL: this.imageURL
      }
      this.message = await this.backend.addOffer(offer)
      if (this.message === "Offer added") {
        this.router.navigate(['/my-account'])
      }
      this.offerPrice = "";
      this.offerTitle = "";
      this.offerDescription = "";
    }
  }
}
