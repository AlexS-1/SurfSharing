import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsonData from './../../assets/content/course.json';
import commentData from '../../assets/content/comments.json';


interface DataEntry {
  id: number;
  title: string;
  description: string;
  userId: string;
  rating?: number;
}

interface CommentEntry {
  username: string;
  review: string;
  kurs_id: number;
  date: string;
  rating: number;
}

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  dataEntry: DataEntry | undefined;
  reviews: CommentEntry[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.dataEntry = jsonData.find((entry) => entry.id === parseInt(id, 10));
      this.reviews = commentData.filter((entry) => entry.kurs_id === parseInt(id, 10));
    });
  }
}