import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { doc, setDoc, getDoc, deleteDoc, query, where, getDocs, collection, documentId } from "firebase/firestore"
import { User } from './models/user';
import { Evaluation } from './models/evaluation';
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
  // INFO: This function adds a default picture and an empty course list to the useres data
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
        courses: user.courses,
        profilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      }
      // Creates a new doc with the userId as doc name
      await setDoc(doc(this.db, 'users', data.id.toString()), data);
      message = "You successfully registered"
    }
    return message;
  }

  async addOffer(offer: Offer): Promise<string> {

    //Check if course already exists
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

  async addEvaluation(evaluation: Evaluation): Promise<string> {

    //Create data
    const data = {
      courseID: evaluation.courseID,
      date: evaluation.date,
      username: evaluation.username,
      rating: evaluation.rating,
      review: evaluation.review
    }

    //Create course reference id
    const courseReferenceID = this.cyrb53(evaluation.courseID.toString()).toString();
    const reviewReferenceID = courseReferenceID + this.cyrb53(evaluation.username.toString()).toString();

    //Check if course already exists
    const courseReference = doc(this.db, "courses", courseReferenceID);
    const courseDocument = await getDoc(courseReference);
    if(!courseDocument.exists()) {
      return "Please add the course first";
    } else {
      const reviewReference = doc(this.db, "evaluations", reviewReferenceID);
      const reviewDocument = await getDoc(reviewReference)
      if (reviewDocument.exists()) {
        return "You can only review a course once";
      }
      await setDoc (reviewReference, data);
      return "Review added";
    }
  }

  async addToUsersCourses(username: string, courseID: number) {
    const userID = this.cyrb53(username).toString();
    const userReference = doc(this.db, "users", userID);
    let userData = await this.getUserData(username);
    if (userData.exists()) {
        let userCourses: number[] = userData.data()['courses'];
        if (!userCourses.includes(courseID)) {
            userCourses.push(courseID);
        }
        const data: User = {
            id: userData.data()['id'] ,
            username: userData.data()['username'],
            firstName: userData.data()['firstName'],
            surname: userData.data()['surname'],
            email: userData.data()['email'],
            dateOfBirth: userData.data()['dateOfBirth'],
            password: userData.data()['password'],
            courses: userCourses,
            profilePicture: userData.data()['profilePicture']
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
    const courseDocument = await getDoc(doc(this.db, 'courses', this.cyrb53(id.toString()).toString()));
    return courseDocument
  }

  // Retrieeve the evaluations for a given user
  async getEvaluationsForUser(username: string) {
    const q = query(collection(this.db, 'evaluations'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  async getEvaluationsForCourse(courseID: number) {
    const q = query(collection(this.db, 'evaluations'), where('courseID', '==', courseID));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }

  // Get all courses in database for browse-courses view
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


  async getAllEvaluations() {
    const evaluationQuery = query(collection(this.db, "evaluations"));
    const evaluationCollection = await getDocs(evaluationQuery);
    const allEvaluations: Evaluation[] = [];
    evaluationCollection.forEach((doc) => {
      const evaluation: Evaluation = {
        username: doc.data()['username'],
        date: doc.data()['date'],
        review: doc.data()['review'],
        rating: doc.data()['rating'],
        courseID: doc.data()['courseID']
      }
      allEvaluations.push(evaluation);
    });
    return allEvaluations;
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
        courses: doc.data()['courses'],
        profilePicture: doc.data()['profilePicture']
      }
      allusers.push(user);
    });
    return allusers;
  }

  // Retrieve course data
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

  // Remove course from user selected course
  async removeFromUserCourses(username: string, courseID: number) {
    const userID = this.cyrb53(username).toString();
    const userReference = doc(this.db, "users", userID);
    let userData = await this.getUserData(username);
    if (userData.exists()) {
        let userCourses: number[] = userData.data()['courses'];
        if (userCourses.includes(courseID)) {
          const index = userCourses.indexOf(courseID, 0);
          if (index > -1) {
             userCourses.splice(index, 1);
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
            courses: userCourses,
            profilePicture: userData.data()['profilePicture']
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
