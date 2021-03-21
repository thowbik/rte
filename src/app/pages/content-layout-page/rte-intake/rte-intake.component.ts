import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-rte-intake',
  templateUrl: './rte-intake.component.html',
  styleUrls: ['./rte-intake.component.scss']
})
export class RteIntakeComponent implements OnInit {
  public RTEdata : any[] = [];
  public dataHeader : any[] = [];
  public dataHeader2 : any[] = [];
  public rteDataSchool : any[] = [];
  pageStage = 1;

  
  constructor(public routers : Router, 
    public contentService: ContentService, 
    public router: Router
    ) { }

  ngOnInit() {
   this.onRteList();
    this.dataHeader = [{field: 'district_name', header: 'Distict', widthstyle:'12em' },{ field: 'Total Schools', header: 'Total Schools', widthstyle:'8em' },
    // { field: 'RTE Seats', header: 'RTE Seats' , widthstyle:'8em'}
  ];
    this.dataHeader2 = [{field: 'edu_dist_name', header: 'Education District', widthstyle:'14em'},{field: 'udise_code', header: 'UDISE Code', widthstyle:'10em'},{ field: 'school_name', header: 'School Name', widthstyle:'18em' },
    // { field: 'RTE Seats', header: 'RTE Seats', widthstyle:'10em' },
    { field: 'School Type', header: 'School Type', widthstyle:'10em' },{ field: 'Entry Class', header: 'Entry Class', widthstyle:'10em' }]
  }
  onRteList() {
    this.contentService.getRTEIntakeCapacity(true).subscribe(res => {
      debugger;
      this.RTEdata= res.allstuds.allstuds;
      console.log(this.RTEdata);
    });
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToback() {
    debugger;
    this.pageStage = 1;
  }

  onSelectedDistrict(distid)
  {
    debugger;
    this.contentService.getRTEIntakeDistwise(distid).subscribe(res => {
      debugger;
      this.rteDataSchool= res.allstuds.allstuds;
      console.log(this.rteDataSchool);
      this.pageStage++;
    });
  }
}
