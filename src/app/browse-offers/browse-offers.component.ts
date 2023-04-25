import { Component } from '@angular/core';
import contentData from './../../assets/content/course.json';

@Component({
  selector: 'app-browse-offers',
  templateUrl: './browse-offers.component.html',
  styleUrls: ['./browse-offers.component.css']
})
export class BrowseOffersComponent {
  contentData = contentData;

  ngOnInit(): void {}
}
