import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Variable to hold userdata arry
  private users: { id: number; email: string; password: string }[] = [];

  // variables to hold login status and role
  private loggedIn = false;
  private userRole = 'visitor';

  constructor(private http: HttpClient, private router: Router) {
    // Perform loading of user data (only needed for json method)
    this.loadUsers();

    // Initialize login status vairables
    this.loggedIn = !!sessionStorage.getItem('loggedInToken');

    ////////////////
    // ATTENTION: // This will read the local chached last state. For testing make sure to be logged out befor testing anything
    ////////////////
    this.userRole = sessionStorage.getItem('role') || 'visitor';      // ToDo: add verification to set logged in user state if token is still valid
  }

  /////////////////////////////////
  /// Validation of credentials ///
  /////////////////////////////////

  // load user credential data from json file
  loadUsers() {
    return this.http.get<{ users: { id: number; email: string; password: string }[] }>('../assets/userdata/userLogInData.json').subscribe((data) => {
      this.users = data.users;
      //console.log(data);            // for debugging
      //console.log(this.users[0]);   // for debugging
    });
  }

  // Helper function to check entries in users[] loaded from database
  private findUserByMailAndPw(userEntry : { id: number; email: string; password: string }, email: string, password: string){
    return userEntry.email === email && userEntry.password === password ;
  }

  // Valifation function to be called by service user
  // Returns the first match for email+password pair in user data array
  private validateCredentials(email: string, password: string): boolean {
    //const user = this.users.find((u) => u.email === email && u.password === password);
    for (let i=0; i<this.users.length; i++){
      if(this.findUserByMailAndPw(this.users[i], email, password)){
        // console.log("found user");     // for debugging
        // console.log(this.users[i]);    // for debugging
        return true;
      }
    }
    console.log("user not found in database");
    return false;
  }


  ///////////////////////
  /// Log-In handling ///
  ///////////////////////

  login(email: string, password: string) : boolean{
    let succssfulLookup = this.validateCredentials(email, password);
    // TODO: Implement login logic and set role in local storage
    let successfulState = false;

    if(succssfulLookup){
      sessionStorage.setItem('loggedInToken', 'true');
      successfulState = true;
      if(true /* add variable to denominate user role*/){
        sessionStorage.setItem('role', 'user');
        this.userRole = 'user'
      }
    }
    if(succssfulLookup && successfulState){
      console.log("Successfully logged in")  // for debugging
      this.router.navigate(['/home']);
    }else{
      console.log("Log in failed in auth-service.ts, logIn()")  // for debugging
    }
    return succssfulLookup && successfulState;
  }

  // Function to perfrorm logout
  // Sets login state to false, removes user role
  logout() : boolean{
    this.loggedIn = false;
    this.userRole = 'visitor';
    sessionStorage.setItem('loggedInToken', 'false');
    sessionStorage.setItem('role', 'visitor');
    console.log("Successfully logged out")  // for debugging
    return true;
  }

  // Getter for login status, logged in = true
  isLoggedIn() : boolean{
    return this.loggedIn || !!sessionStorage.getItem('loggedInToken');   // for debugging;
  }

  // Getter for user role
  // 'visitor' = not loged in, 'user' = logged in user, 'admin'= logged in user with admin rights
  getUserRole() : string{
    this.userRole = sessionStorage.getItem('role') as string;
    return this.userRole;
  }
}

