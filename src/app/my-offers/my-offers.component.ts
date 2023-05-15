import { Component, OnInit } from '@angular/core';
import { BackendDataService } from '../backend-data.service';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  contentData: any[] = [];
  selectedCourseIds = [1, 2]; // Liste der ausgewählten Kurs-IDs

  constructor(private backend: BackendDataService, private auth: AuthService) {

  }

  ngOnInit(): void {
  }

  /*private async loadSelectedCourses() {
    const currentUN = await this.auth.getCurrentUserName()
    const currentUser = await this.backend.getUserData(currentUN);
    if (currentUser.exists()) {
      selc
    }
    this.backend.getMyOffers()
  }*/
}