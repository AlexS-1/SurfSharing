import { Component, OnInit } from '@angular/core';
import jsonData from './../../assets/content/course.json';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent implements OnInit {
  contentData: any[] = [];
  selectedCourseIds = [1, 2]; // Liste der ausgewählten Kurs-IDs

  ngOnInit(): void {
    this.loadSelectedCourses();
  }

  private loadSelectedCourses(): void {
  }
}