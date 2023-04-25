import { Component } from '@angular/core';
import { NavBarService } from './../nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})

export class NavBarComponent {
  isSideBarOpen = false;

  constructor(private navBarService: NavBarService) {
    this.navBarService.isOpen$.subscribe((isOpen) => (this.isSideBarOpen = isOpen));
  }

  toggleSideBar() {
    this.navBarService.toggleSideBar();
  }
}