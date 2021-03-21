import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { NavBarService } from 'src/services/navbar.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})
export class LeftmenuComponent implements OnInit {
  url: any;
  isOpen: boolean =true;
  toggleTitle: string;
  isShowStudentMenu:boolean = false;
  isShowSchoolMenu: boolean = false;
  isShowSchemeMenu:boolean =false;
  isShowTimetableMenu:boolean =false;
  selectedIndex: number;

  constructor(private router : Router,private navBarService: NavBarService,private userSessionService: UserSessionService) {
   }

  ngOnInit() {
  //   this.navBarService.change.subscribe(isOpen => {
  //     this.isOpen = isOpen;
  // });
    this.toggleTitle = this.isOpen ? 'Close' : 'Expand';
    
  }
  navigate(txt:string):void{
    debugger;
   console.log(txt);
     this.url = '/'+txt;
    // url.push("/"+txt);
    // this.router.navigate(['/department']);
    this.router.navigate([this.url]);
  }
  sidebarToggle()
  {
    debugger;
    this.navBarService.toggle();
    this.isOpen = !this.isOpen;
    this.toggleTitle = this.isOpen ? 'Close' : 'Expand';
  }
  toggleList(item,index)
  {
    this.selectedIndex = index;
    debugger;
    if(item == 'students')
    {
this.isShowStudentMenu = !this.isShowStudentMenu;
    }
    else if(item == 'schools')
    {
this.isShowSchoolMenu = !this.isShowSchoolMenu;
    }
    else if(item == 'schemes')
    {
this.isShowSchemeMenu = !this.isShowSchemeMenu;
    }
    else if(item == 'timetable')
    {
      debugger;
this.isShowTimetableMenu = !this.isShowTimetableMenu;
    }
  }

}
