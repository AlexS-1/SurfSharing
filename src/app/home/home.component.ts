import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, setDoc, getDoc, deleteDoc, query, where, getDocs, collection } from "firebase/firestore"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private firestore: AngularFirestore) {

  }

  ngOnInit() {
    
  }

}

