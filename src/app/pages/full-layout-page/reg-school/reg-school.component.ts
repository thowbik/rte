import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import {MessageService} from 'primeng/api';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as _ from 'lodash';
import { FullLayoutService } from '../full-layout.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { NavigationService } from 'src/services/navigation.service';
@Component({
  selector: 'app-reg-school',
  templateUrl: './reg-school.component.html',
  styleUrls: ['./reg-school.component.scss'],
  providers: [MessageService]
})
export class RegSchoolComponent implements OnInit {
  list1: any[]=[];   
  list2: any[]=[];
  routeData: any; 
  appvalue: any;
  registerNo: number;
  list: any;
  form: FormGroup;
  canvasImage: any;
  selectedSchList: any[] =[];
  isAllowedToEdit: boolean = true;
  logoutdisplay: boolean = false;
  filteredList: any;
  class: any;
  gender: any;
  notAllowedSchoolType: string;
  constructor(public router: Router,
    private schListservice :FullLayoutService,
    public contentService: FullLayoutService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public fb: FormBuilder,
    private alertService: AlertService,
    private userSessionService: UserSessionService,
    private authService : AuthenticationService,
    private navigationService: NavigationService) { 
      this.routeData = this.route.snapshot;
      this.appvalue = this.routeData.queryParams.value;
      this.registerNo = this.userSessionService.regId();
      this.class = this.userSessionService.class();
      this.gender = this.userSessionService.gender();
      this.notAllowedSchoolType = this.gender == "1" ? "Girls" : "Boys";
    }

  ngOnInit() {
    debugger;
    this.getSchoolsList();
    // this.getselectedSchoolList();
    // this.list1 = [{"label":"list1","value":"1"},{"label":"list2","value":"2"},{"label":"list3","value":"3"},{"label":"list4","value":"4"},];
    this.list2 = [];
    // this.onData();
  }
  showConfirmation()
  {
    this.logoutdisplay = true;
  }
  onLogout() {
    this.authService.logOut();
    this.navigationService.goToHome();
    localStorage.clear();
  }
  cancel() {
    this.logoutdisplay = false;
  }
  onPersonal() {
    this.router.navigate(['/reg-personal']);
  }

  onParent() {
    this.router.navigate(['/reg-parent']);
  }

  onAddress() {
    this.router.navigate(['/reg-address']);
  }

  onDocument() {
    this.router.navigate(['/reg-document']);
  }
  onSaveAddress()
  {
    console.log(this.list2);
  }

  disabled() {
    console.log('disabled?');
    return true;
}
getSchoolsList()
{
  this.schListservice.getschList(this.registerNo).subscribe(res => {
    if (res.result.length > 0) {
      debugger;

      this.filteredList = res.result.filter(element => element.entry_class == this.class && element.school_type != this.notAllowedSchoolType)
      debugger;
    this.list1 = this.filteredList.map(l => {return{label:l.school_name,value:l.id,udise_code:l.udise_code}});
    this.getselectedSchoolList();
    }
  
  });
}
getselectedSchoolList() {
  debugger;
  this.schListservice.getSelectedschList(this.registerNo).subscribe(res => {                          
  
    if (res.result.length > 0) {
    this.selectedSchList = res.result;
    this.isAllowedToEdit = this.selectedSchList[0]['appli_status'] == 0 ? true : false;
    this.list2 = this.selectedSchList.map(l => {return{label:l.school_name,value:l.school_id,udise_code:l.udise_code}});
    for (var i = 0; i < this.list2.length; i++) { 
      console.log("Test:" +this.list1);
var duplicateList = this.list1.find(element => element.udise_code == this.list2[i].udise_code)
        const index: number = this.list1.indexOf(duplicateList);
        if (index !== -1) {
            this.list1.splice(index, 1);
        }
      }
    }
  //   this.list1 = _.differenceWith(this.list2, this.list1, function (o1, o2) {
  //     return o1['udise'] === o2['udise']
  // });
    else {
      this.isAllowedToEdit = true;
    }
  });
}
// onView() {
//   this.router.navigate(['/rte-pdf']);
// }
// onPdf() {
//   this.router.navigate(['/rte-pdf'],{queryParams: {'pdfvalue':1,'regno':this.registerNo}, skipLocationChange: false});

// }

save() {
  debugger;

  if(this.registerNo)
  {
  if (this.list2.length <= 5) {
    var school_details = this.list2.map(l => {return{school_name:l.label,school_id:l.value}}); 
    var records = {
      "records": {
          "register_no": this.registerNo,
          "school_details": school_details
        }
      }
    this.contentService.saveSelectedSchools(records).subscribe((result) => {
      if (result.dataStatus == true) {
        debugger;
      //  this.alertService.success("Schools Selected Successfully");
        this.messageService.add({severity:'success', summary: 'Schools Selected Successfully', detail:''});
        this.router.navigate(['/rte-pdf']);

        // this.router.navigate(['/reg-parent']);
      }
      else {
        this.messageService.add({severity:'warn', summary: 'Failed', detail:''});

        // this.alertService.error(result.message);
      }
    });
  }
  else {
    this.messageService.add({severity:'warn', summary: 'Maximum 5 Schools can only be selected', detail:''});
  }
}
}


/* Student PDF */
initialValidator() {
  this.form = this.fb.group({
    'student_name': new FormControl('', null),
    "gender": new FormControl('', null),
    "dob": new FormControl('', null),
    "community_name": new FormControl('', null),
    "religion_name": new FormControl('', null),
    "mobile": new FormControl('', null),
    "class": new FormControl('', null),
    "email": new FormControl('', null),
    "parent_name": new FormControl('', null),
    "parent_profession": new FormControl('', null),
    "parent_income": new FormControl('', null),
    "parent_type": new FormControl('', null),
    "map_address": new FormControl('', null),
    "pincode": new FormControl('', null),
    "district_name": new FormControl('', null),

    "register_no": new FormControl('', null),
    "acad_yr": new FormControl('', null),
    "sub_category": new FormControl('', null),
    "category": new FormControl('', null),
    "address": new FormControl('', null),
    "photo_filepath": new FormControl('', null),
  });
}
onData() {
  this.contentService.getStudentListData(this.registerNo).subscribe(res => {
    this.list = res.allstuds.registration_pdf_list[0];
    this.form.patchValue(this.list);
    console.log(this.list);
  });
}

// onPdf() {
//   let data = document.getElementById('MyDIv');  
//   html2canvas(data).then(canvas => {
//     const contentDataURL = canvas.toDataURL('image/png')  
//     let pdf = new jspdf('l', 'cm', 'a4');
//     pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
//     pdf.save('Filename.pdf');   
//   }); 
// }
  
}
