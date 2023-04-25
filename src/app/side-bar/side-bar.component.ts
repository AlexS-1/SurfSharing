import { NavBarService } from '../nav-bar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  isSideBarOpen = false;

  constructor(private navBarService: NavBarService, private authService: AuthService) {}

  ngOnInit() {
    this.navBarService.isOpen$.subscribe(isOpen => this.isSideBarOpen = isOpen);
  }

  toggleSideBar() {
    this.navBarService.toggleSideBar();
  }
  signOut(): boolean{
    return this.authService.logout();
  }
}