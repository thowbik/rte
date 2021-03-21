import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FullLayoutService } from '../full-layout.service';
import { UserSessionService } from 'src/services/usersession.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { NavigationService } from 'src/services/navigation.service';


@Component({
  selector: 'app-reg-parent',
  templateUrl: './reg-parent.component.html',
  styleUrls: ['./reg-parent.component.scss'],
  providers: [MessageService]
})
export class RegParentComponent implements OnInit {
  parentDetailsForm: FormGroup;
  guardian: string[] = [];
  parentcategorylist: any;
  parentcategoryDetails: any;
  parentsubcategoryDetails: any;

  formvalues: any = [];
  dobformat: any;
  communitylist: any;
  communtysec: any = { result: '' };
  religionlist: any;
  communityDetails: any;
  religionDetails: any;
  parentProfession: any[] = [];
  categorylist: any[] = [];
  subcategorylist: any[] = [];
  subcategorylist1: any[] = [];
  submitted: boolean;
  categoryvalue: any;

  subCategories: any;
  routeData: any;
  appvalue: any;
  registerNo: number;
  logoutdisplay: boolean = false;
  applicantDetails: any[] =[];
  isAllowedToEdit: boolean = false;
  cateId: any;
  noSpecial: any = "^[a-zA-Z \b]+$";
  constructor(public alertService: AlertService,
    public contentService: FullLayoutService,
    private messageService: MessageService,
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userSessionService: UserSessionService,
    private authService : AuthenticationService,
    private navigationService: NavigationService,
    private el: ElementRef) {
    debugger
    this.routeData = this.route.snapshot;
    this.appvalue = this.routeData.queryParams.value;
    this.registerNo = this.userSessionService.regId();
  }

  ngOnInit() {
    this.initialValidator();
    this.getDropdownValues();
    this.getApplicantDetails();
  }

  initialValidator() {
    this.parentDetailsForm = this.fb.group({
      'parent_type': new FormControl('', Validators.required),
      'parent_name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.noSpecial)])),
      'parent_profession': new FormControl('', Validators.required),
      'parent_income': new FormControl('', Validators.required),
      'app_sub_category': new FormControl('', null),
      'app_category': new FormControl('', Validators.required),
    });
  }

  getApplicantDetails() {
    debugger;
    this.contentService.getApplicantData(this.registerNo).subscribe((res) => {
      this.applicantDetails = res.result;
      if(this.applicantDetails)
      {
        this.parentDetailsForm.patchValue(this.applicantDetails);
        this.isAllowedToEdit = this.applicantDetails['appli_status'] != 0 ? true : false;
        if(this.isAllowedToEdit) {
          this.router.navigate(['/rte-pdf']);
        }
      }
      
    });
}



  getDropdownValues() {
   
    this.parentProfession = [
      { "value": "1", "label": "Government Services" },
      { "value": "2", "label": "Self employed / Business" },
      { "value": "3", "label": "Private Job" },
      { "value": "4", "label": "Home Maker" },
      { "value": "5", "label": "Other" },
    ];

    this.categorylist = [
      { "value": "1", "label": "Weaker Section" },
      { "value": "2", "label": "Disadvantaged Group" },
      { "value": "3", "label": "Disadvantaged Group - Special" }
    ];


    this.subcategorylist = [
      { "value": "2", "label": "BC", "cat_id": "2" },
      { "value": "3", "label": "MBC", "cat_id": "2" },
      { "value": "4", "label": "SC", "cat_id": "2" },
      { "value": "5", "label": "ST", "cat_id": "2" },
      { "value": "6", "label": "SCA", "cat_id": "2" },
      { "value": "7", "label": "DNC", "cat_id": "2" },
    ];

    this.subcategorylist1 = [
      { "value": "8", "label": "Orphan", "cat_id": "3" },
      { "value": "9", "label": "Differently Abled", "cat_id": "3" },
      { "value": "10", "label": "Child of Scavenger", "cat_id": "3" },
      { "value": "11", "label": "Transgender", "cat_id": "3" },
      { "value": "12", "label": "HIV Affected", "cat_id": "3" },
    ];

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
    this.router.navigate(['reg-personal']);
  }

  onAddress() {
    
    this.router.navigate(['reg-address'], { queryParams: {'registerNo': this.registerNo }, skipLocationChange: false });
  }

  onDocument() {
    debugger
    
    this.router.navigate(['reg-document'], { queryParams: {'registerNo': this.registerNo }, skipLocationChange: false });
  }

  onSchool() {
    this.router.navigate(['/reg-school'])
  }

  category(e) {
    debugger
    if (e.value == 2 || e.value == 3) {
      this.parentDetailsForm.controls['app_sub_category'].setValidators(Validators.required);
    }
    else {
      this.parentDetailsForm.controls['app_sub_category'].setValue("");
      this.parentDetailsForm.controls['app_sub_category'].setValidators(null);
    }
    this.parentDetailsForm.controls['app_sub_category'].updateValueAndValidity();
  }

  onSaveParent() {
debugger;
    this.submitted = true;
   this.parentcategoryDetails = this.parentDetailsForm.value.app_category;
   if(this.parentcategoryDetails === '1') {
    this.parentsubcategoryDetails = '1';
   }
   else {
    this.parentsubcategoryDetails = this.parentDetailsForm.value.app_sub_category;
   }
   
    // if (this.parentDetailsForm.value.app_category.value == '1') {
    //   this.parentcategoryDetails = this.parentDetailsForm.value.app_category_list.value;
    // }
    // if (this.parentDetailsForm.value.app_category.value == '2' || this.parentDetailsForm.value.app_category.value == '3') {
    //   this.parentcategoryDetails = this.parentDetailsForm.value.app_category.s;
    // }
    var records = {
      "records":
      {
        "register_no": this.registerNo,
        "parent_type": this.parentDetailsForm.value.parent_type,
        "parent_name": this.parentDetailsForm.value.parent_name,
        "parent_profession": this.parentDetailsForm.value.parent_profession,
        "parent_income": this.parentDetailsForm.value.parent_income,
        "app_category": this.parentDetailsForm.value.app_category,
        "app_sub_category":   this.parentsubcategoryDetails,
      }
    }
    if (this.parentDetailsForm.valid) {
      this.contentService.getParentDetails(records).subscribe((parentresult) => {
        if (parentresult.dataStatus == true) {
          this.messageService.add({ severity: 'success', summary: 'Records Updated Successfully', detail: '' });
          this.router.navigate(['reg-address'], { queryParams: {'value': this.appvalue, 'registerNo': this.registerNo }, skipLocationChange: false });
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Failed', detail: '' });
        }
      });
    }
    else {
this.validateControl();
    }
  }
 validateControl() {
    for (const key of Object.keys(this.parentDetailsForm.controls)) {
      if (this.parentDetailsForm.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        console.log('invalid keys',key);
        invalidControl.focus();
         break;
      }
    }
    this.messageService.add({severity:'warn', summary: 'Please fill all the Required Fields', detail:''});
  }
}
