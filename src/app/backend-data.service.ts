import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { doc, setDoc, getDoc, deleteDoc, query, where, getDocs, collection, documentId } from "firebase/firestore"
import { User } from './models/user';
import { Offer } from './models/offer';



@Injectable({
  providedIn: 'root'
})

export class BackendDataService {

  constructor(private firestore: AngularFirestore) {

  }

  db = this.firestore.firestore;

//ADD DATA TO FIRESTORE

  // Receives the users data and enters it to the firebase realtime database
  // Enter new user only if it does not already exist
  // INFO: This function adds a default picture and an empty offers list to the useres data
  async addUser(user: User): Promise<string> {
    let message = "";

    // Here: serach database for doc with matching user-id = this.cyrb53(this.username).toString() --> user_id
    const userDoc = await getDoc(doc(this.db, 'users', this.cyrb53(user.username.toString()).toString()));
    if (userDoc.exists()) {
      return "Username already exists"
    } else {
      // Here: search database for email already in use
      const q = query(collection(this.db, 'users'), where('email' , '==', user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data()['email'] === user.email) {
          message =  "User with this E-Mail already exists\n Please log in"
        }
      });
    }
    if (message != "User with this E-Mail already exists\n Please log in") {
      // Only add new user account if user is not already in the database and returen appropriate response
      const data = {
        id: this.cyrb53(user.username.toString()),
        username: user.username,
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        password: user.password,
        favOffers: user.favOffers
      }
      // Creates a new doc with the userId as doc name
      await setDoc(doc(this.db, 'users', data.id.toString()), data);
      message = "You successfully registered"
    }
    return message;
  }

  async addOffer(offer: Offer): Promise<string> {

    //Check if offer already exists
    const documentID: string = this.cyrb53(offer.createdByUserID.toString() + Date.now().toString()).toString()
    const documentReference = doc(this.db, "offers", documentID);
    const offerDoc = await getDoc(documentReference);

    //Create data
    const data: Offer = {
      id: Number(documentID),
      title: offer.title,
      description: offer.description,
      createdByUserID: offer.createdByUserID,
      pricePH: offer.pricePH,
      imageURL: offer.imageURL
    }

    //Add data if it does not exist yet
    if(!offerDoc.exists()) {
      setDoc(documentReference, data);
      return "Offer added"
    }
    return "Offer already exists"
  }

  async addToUsersOffers(username: string, offerID: number) {
    const userID = this.cyrb53(username).toString();
    const userReference = doc(this.db, "users", userID);
    let userData = await this.getUserData(username);
    if (userData.exists()) {
        let userOffers: number[] = userData.data()['favOffers'];
        if (!userOffers.includes(offerID)) {
            userOffers.push(offerID);
        }
        const data: User = {
            id: userData.data()['id'] ,
            username: userData.data()['username'],
            firstName: userData.data()['firstName'],
            surname: userData.data()['surname'],
            email: userData.data()['email'],
            dateOfBirth: userData.data()['dateOfBirth'],
            password: userData.data()['password'],
            favOffers: userOffers
        }
        await setDoc(userReference, data);
    }
  }

//READ DATA

  // Retrieve user data from username and return data
  async getUserData(username: String) {
    const userDoc = await getDoc(doc(this.db, 'users', this.cyrb53(username.toString()).toString()));
    return userDoc
  }

  // Retrieve user data from username and return data
  // Rerurns doc.data() on success or empty data ( {} ) on failure
  async getOfferData(id: number) {
    const offerDocument = await getDoc(doc(this.db, 'offers', this.cyrb53(id.toString()).toString()));
    return offerDocument
  }

  // Get all offers in database for browse-offers view
  async getAllOffers() {
    const offersQuery = query(collection(this.db, "offers"));
    const offersCollection = await getDocs(offersQuery);
    const allOffers: Offer[] = [];
    offersCollection.forEach((doc) => {
      const offer: Offer = {
        id: doc.data()['id'],
        title: doc.data()['title'],
        description: doc.data()['description'],
        createdByUserID: doc.data()['createdByUserID'],
        imageURL: doc.data()['imageURL'],
        pricePH: doc.data()['pricePH']
      }
      allOffers.push(offer);
    });
    console.log(allOffers);
    return allOffers;
  }

  async getAllUsers() {
    const usersQuery = query(collection(this.db, "users"));
    const userCollection = await getDocs(usersQuery);
    const allusers: User[] = [];
    userCollection.forEach((doc) => {
      const user: User = {
        id: doc.data()['id'],
        username: doc.data()['username'],
        firstName: doc.data()['firstName'],
        surname: doc.data()['surname'],
        email: doc.data()['email'],
        dateOfBirth: doc.data()['dateOfBirth'],
        password: doc.data()['password'],
        favOffers: doc.data()['favOffers']
      }
      allusers.push(user);
    });
    return allusers;
  }

  // Retrieve offers data
  async getMyOffers(offers: number[]) {
    let myOfferDocuments: Offer[] = [];
    const collectionQuery = query(collection(this.db, 'offers'));
    const collectionSnapshot = await getDocs(collectionQuery)
    for (let offerID of offers) {
      collectionSnapshot.forEach((doc) => {
        if (doc.data()['id'] === Number(offerID)) {
          const offer: Offer = {
            id: doc.data()['id'],
            title: doc.data()['title'],
            description: doc.data()['description'],
            createdByUserID: doc.data()['createdByUserID'],
            pricePH: doc.data()['pricePH']
          }
          myOfferDocuments.push(offer);
        }
      });
    }

    return myOfferDocuments
  }

  // Retrieve login data from token return tokenDoc
  async getloggedInData(id: String| null): Promise<DocumentData|null>{
    if(id == null){
      return null;
    }
    const tokenDoc = await getDoc(doc(this.db, 'loggedIn', id.toString()));
    return tokenDoc;
  }

  async getUserNameByMail(mail: string): Promise<string | null>{
    const userDocs = await getDocs(query(collection(this.db, 'users'), where('email', '==', mail)));
    let docUsername: string | null = null;
    userDocs.forEach((doc) => {
      if (doc.data()['email'] === mail) {
        docUsername = doc.data()['username'];
      }
    });
    return docUsername;
  }

//REMOVE DATA FROM FIRESTORE

  // Remove user form logged in user
  async removeloggedInData(id: String| null): Promise<boolean>{
    if(id == null){
      return false;
    }
    await deleteDoc(doc(this.db, 'loggedIn', id.toString()));
    return true;
  }

  // Remove offer from user selected offer
  async removeFromUserOffers(username: string, offerID: number) {
    const userID = this.cyrb53(username).toString();
    const userReference = doc(this.db, "users", userID);
    let userData = await this.getUserData(username);
    if (userData.exists()) {
        let userOffers: number[] = userData.data()['offers'];
        if (userOffers.includes(offerID)) {
          const index = userOffers.indexOf(offerID, 0);
          if (index > -1) {
             userOffers.splice(index, 1);
          }
        }
        const data: User = {
            id: userData.data()['id'] ,
            username: userData.data()['username'],
            firstName: userData.data()['firstName'],
            surname: userData.data()['surname'],
            email: userData.data()['email'],
            dateOfBirth: userData.data()['dateOfBirth'],
            password: userData.data()['password'],
            favOffers: userOffers
        }
        await setDoc(userReference, data);
    }
  }

  // 53-Bit hash function from https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
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
