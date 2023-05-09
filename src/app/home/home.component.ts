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

  db = this.firestore.firestore;

  data = {
    id: "Hi"
  }

  ngOnInit() {
    this.test();
  }

  async test() {
    const dataReference = doc(this.db, "test", this.cyrb53("HI").toString())
    await setDoc(dataReference, this.data);
  }

  private cyrb53(str: string, seed = 0){
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };
}

