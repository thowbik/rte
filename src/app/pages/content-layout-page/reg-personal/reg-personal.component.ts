import { Component, OnInit, ElementRef } from '@angular/core';
import { AlertService } from 'src/services/alert.service';
import { ContentService } from '../content.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { UserSessionService } from 'src/services/usersession.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { NavigationService } from 'src/services/navigation.service';


@Component({
  selector: 'app-reg-personal',
  templateUrl: './reg-personal.component.html',
  styleUrls: ['./reg-personal.component.scss'],
  providers: [MessageService]
})
export class RegPersonalComponent implements OnInit {


  personalDetailsForm: FormGroup;
  submitted: boolean;
  dobformat: any;
  communitylist: any;
  communtysec: any = { result: '' };
  religionlist: any;
  communityDetails: any;
  religionDetails: any;

  personalGender: any[] = [];
  personalClass: any[] = [];

  dobeligible: any;
  dobeligiblemonth: any;
  dobeligibledate: any;
  routeData: any;
  appvalue: any;
  registerNo: number;
  applicantDetails: any[] = [];
  isDisable: boolean = false;
  display: boolean = false;
  dobformatReadOnly: string;
  isAllowedToEdit: boolean = false;
  noSpecial: any = "^[a-zA-Z \b]+$";
  emailpattern: any = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  logoutdisplay: boolean = false;
  dobValue: any;
  
  

  constructor(public alertService: AlertService,
    public contentService: ContentService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public router: Router,
    private userSessionService: UserSessionService,
    private authService: AuthenticationService,
    private navigationService: NavigationService,
    private fb: FormBuilder,
    private el: ElementRef) {
    this.routeData = this.route.snapshot;
    debugger;
    this.appvalue = this.routeData.queryParams.value;
    this.registerNo = this.userSessionService.regId();
    this.registerNo = this.registerNo ? this.registerNo : 0;
    this.isDisable = this.registerNo != 0 ? true : false;
  }

  ngOnInit() {
    this.initialValidator();
    this.getDropdownValues();
    if (this.registerNo != 0) {
      this.getApplicantDetails();
    }
  }
  initialValidator() {
    debugger;
    this.registerNo = this.registerNo ? this.registerNo : 0;
    this.personalDetailsForm = this.fb.group({
      'register_no': new FormControl(this.registerNo, Validators.required),
      'student_name': new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.noSpecial)])),
      'gender': new FormControl('', Validators.required),
      'dob': new FormControl('', Validators.required),
      'community': new FormControl('', Validators.required),
      'religion': new FormControl('', Validators.required),
      'mobile': new FormControl('', Validators.required),
      'class': new FormControl('', null),
      'email': new FormControl('', null),
      // 'email': new FormControl('', (Validators.compose([null, Validators.pattern(this.emailpattern)]))),
      'last_renewal_file': new FormControl('', null),
      'password': new FormControl('', Validators.required),
      'confirmpassword': new FormControl('', Validators.required)
    });
  }

  getApplicantDetails() {
    debugger;
    this.contentService.getApplicantData(this.registerNo).subscribe((res) => {
      debugger;
      this.applicantDetails = res.result;
      if (this.applicantDetails) {
        this.getCommunity(this.applicantDetails['religion']);
        this.personalDetailsForm.patchValue(this.applicantDetails);
        // var className = this.personalDetailsForm.value.class == "1" ? "I" : "LKG";
        // this.personalDetailsForm.controls['class'].setValue(className);
        this.personalDetailsForm.controls['confirmpassword'].setValue(this.applicantDetails['password']);
        this.dobformatReadOnly = moment(this.personalDetailsForm.value.dob).format('DD-MM-YYYY');
        this.isDisable = true;
        this.isAllowedToEdit = this.applicantDetails['appli_status'] != 0 ? true : false;

      }
    });
  }
  getDropdownValues() {
    this.contentService.getDropdownList(true).subscribe((result) => {
      debugger;
      this.communtysec = result;

      this.religionlist = this.communtysec['religion'].map(item => {
        return {
          label: item.religion_name,
          value: item.id
        }
      });
    });
    this.personalGender = [
      { "value": "1", "label": "Male" },
      { "value": "2", "label": "Female" },
      { "value": "3", "label": "Transgender" },
    ];
    this.personalClass = [
      { "value": "", "label": "-" },
      { "value": "13", "label": "LKG" },
      { "value": "1", "label": "I" },
     
    ];
    
  }
  getCommunity(religionId) {
    this.communitylist = [];
    if(this.communtysec['community'] && this.communtysec['community'].length > 0) {
      var getCommunityData = this.communtysec['community'].filter(element => element.religion_id == religionId);
      if(getCommunityData && getCommunityData.length > 0) {
        this.communitylist = getCommunityData.map(item => {
          return {
            label: item.community_name,
            value: item.id
          }
        });
      }
    }



  }

  showConfirmation() {
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


  onParent() {
    this.router.navigate(['/reg-parent'])
  }

  onAddress() {
    this.router.navigate(['/reg-address'])
  }

  onDocument() {
    this.router.navigate(['/reg-document'])
  }

  onSchool() {
    this.router.navigate(['/reg-school'])
  }

  disabled() {
    return true;
  }


  getData(event) {
    debugger
    this.dobValue = moment(event).format('DD-MM-YYYY');
    this.dobeligible = moment(event).format('YYYY');
    this.dobeligiblemonth = moment(event).format('M');
    this.dobeligibledate = moment(event).format('D');
    if ((this.dobeligible == 2016 && this.dobeligiblemonth >= 6) || (this.dobeligibledate == 31 && this.dobeligiblemonth == 5 && this.dobeligible == 2016) || (this.dobeligible == 2017 && this.dobeligiblemonth <= 7)) {
      this.personalDetailsForm.controls['class'].setValue("13");
    } else if ((this.dobeligible == 2014 && this.dobeligiblemonth >= 6) || (this.dobeligibledate == 31 && this.dobeligiblemonth == 5 && this.dobeligible == 2014) || (this.dobeligible == 2015 && this.dobeligiblemonth <= 7)) {
      this.personalDetailsForm.controls['class'].setValue("1");
    }
    else {
      this.personalDetailsForm.controls['class'].setValue("");
    }
  }

  onSavePersonal() {
    debugger;
    this.submitted = true;
    if (this.personalDetailsForm.valid) {
    this.dobformat = moment(this.personalDetailsForm.value.dob).format('YYYY-MM-DD');
    const formData = new FormData();
    // var classId = this.personalDetailsForm.value.class == "I" ? "1" : "13";
    var records = {
      "records":
      {
        "register_no": this.personalDetailsForm.value.register_no,
        "student_name": this.personalDetailsForm.value.student_name,
        "dob": this.dobformat,
        "gender": this.personalDetailsForm.value.gender,
        "community": this.personalDetailsForm.value.community,
        "religion": this.personalDetailsForm.value.religion,
        "mobile": this.personalDetailsForm.value.mobile,
        "class": this.personalDetailsForm.value.class,
        "email": this.personalDetailsForm.value.email,
        "password": this.personalDetailsForm.value.password
      }
    }
    if (this.personalDetailsForm.value.password === this.personalDetailsForm.value.confirmpassword) {
      if (this.personalDetailsForm.value.class != '' && this.personalDetailsForm.value.class != '-') {
      
          this.contentService.getPersonalDetails(records).subscribe((result) => {
            if (result.dataStatus == true) {
              debugger;
              this.registerNo = result.reg_no;
              this.messageService.add({ severity: 'success', summary: 'Records Updated Successfully', detail: '' });
              this.display = true;

              // this.router.navigate(['reg-parent'],  {queryParams: {'registerNo':this.registerNo}, skipLocationChange: false});

            }
            else {
              this.messageService.add({ severity: 'warn', summary: 'Failed', detail: '' });
            }
          });
        }
      else {
        this.messageService.add({ severity: 'warn', summary: 'Please give valid date of birth', detail: '' });
      }
    }
    else {
      this.messageService.add({ severity: 'warn', summary: 'Password and confirm password does not match', detail: '' });
    }
  }
    else {
      this.validateControl();
    }
   
  }

  onLogin() {
    this.display = false;
    this.router.navigate(['/login']);

  }
  validateControl() {
    for (const key of Object.keys(this.personalDetailsForm.controls)) {
      if (this.personalDetailsForm.controls[key].invalid) {
         const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
        console.log('invalid keys',key);
        invalidControl.focus();
         break;
      }
    }
    this.messageService.add({severity:'warn', summary: 'Please fill all the Required Fields', detail:''});
  }
}
