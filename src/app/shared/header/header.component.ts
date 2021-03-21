import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavigationService } from 'src/services/navigation.service';
import { AlertService } from 'src/services/alert.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserSessionService } from 'src/services/usersession.service';
import { NavBarService } from 'src/services/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  schoolName: any;
  userName: string;
  userType: string;
  instDistrict: string;
  isOpen: boolean = false;
  toggleTitle: string;
  isShowDropdown: boolean =false;
  display: boolean = false;
  constructor(
    private navigationService: NavigationService,
    private alertService: AlertService, private router: Router,
    private authService : AuthenticationService,private userSessionService : UserSessionService,private navBarService:NavBarService) {
     }

  ngOnInit() {
  }
  toggleDropdown()
  {
    this.isShowDropdown = !this.isShowDropdown;
  }
  // toggleSidebar()
  // {
  //   this.navBarService.toggle();
  //   this.isOpen = !this.isOpen;
  //   this.toggleTitle = this.isOpen ? 'Close' : 'Expand';
  // }
  showConfirmation()
  {
    this.display = true;
  }
  onLogout()
  {
    this.authService.logOut();
    this.navigationService.goToLogin();
    localStorage.removeItem("schoolName");
    localStorage.removeItem('schoolTypeId');
    localStorage.clear();
  }
  cancel()
  {
this.display = false;
  }
}
