import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionService } from 'src/services/usersession.service';
import { RteService } from '../rte.service';

@Component({
  selector: 'app-rte-intakecapacity',
  templateUrl: './rte-intakecapacity.component.html',
  styleUrls: ['./rte-intakecapacity.component.scss']
})
export class RteIntakecapacityComponent implements OnInit {
  public RTEdata : any[] = [];
  public dataHeader : any[] = [];
  public dataHeader2 : any[] = [];
  public noDataFound : boolean = false;
  public pageStage : number;
  public noDataFound2 : boolean = false;
  public rteDataSchool : any[] = [];

  constructor(
    public routers : Router, 
    private userSessionService: UserSessionService,
    public rteService:RteService) { }

  ngOnInit() {
    // const districtName = this.userSessionService.districtName();
    // if(!districtName){
    //   this.getRTEdata()
    // }
    // if(districtName){
    //   this.onSelectedDistrict(districtName)
    // }
    this.dataHeader = [{field: 'district_name', header: 'Distict', widthstyle:'12em' },{ field: 'Total Schools', header: 'Total Schools', widthstyle:'8em' },{ field: 'Completed Schools', header: 'Completed Schools', widthstyle:'8em' },{ field: 'RTE Seats', header: 'RTE Seats' , widthstyle:'8em'}];
    this.dataHeader2 = [{field: 'edu_dist_name', header: 'Education District', widthstyle:'14em'},{ field: 'block_name', header: 'Block Name', widthstyle:'13em' },{field: 'udise_code', header: 'UDISE Code', widthstyle:'12em'},{ field: 'school_name', header: 'School Name', widthstyle:'20em' },{field: 'Total Section', header: 'Total Section', widthstyle:'13em'},{ field: 'RTE Seats', header: 'RTE Seats', widthstyle:'15em' },{field: 'Completed Schools', header: 'Completed Schools', widthstyle:'15em'}]
  }

  getRTEdata(){
    this.pageStage = 1;
    this.rteService.getRTEServiceData().subscribe((res) => {
      if(res.allstuds.allstuds.length>0){
        this.RTEdata = res.allstuds.allstuds;
      }
      else
      {
        this.noDataFound = true;
      }
    })
  }
  onSelectedDistrict(rteData){
    this.pageStage = 2;
    this.rteService.getRTEServiceDistrictData(rteData).subscribe((res) => {
      const result = res.allstuds.allstuds;
      if(result.length>0){
        this.rteDataSchool = result;
      }
      else
      {
        this.noDataFound2 = true;
      }
    })
  }
  
}
