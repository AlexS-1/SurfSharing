import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();
  isSideBarFoldedIn = true;

  toggleSideBar() {
    this.isSideBarFoldedIn = !this.isSideBarFoldedIn;
    this.isOpen.next(!this.isOpen.value);
  }
}
