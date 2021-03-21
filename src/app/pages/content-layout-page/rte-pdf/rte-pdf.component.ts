import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ContentService } from '../content.service';
import html2canvas from 'html2canvas';
import { Router, ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
import { MessageService } from 'primeng/api';
import { UserSessionService } from 'src/services/usersession.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-rte-pdf',
  templateUrl: './rte-pdf.component.html',
  styleUrls: ['./rte-pdf.component.scss'],
  providers: [MessageService]
})
export class RtePdfComponent implements OnInit {
  form: FormGroup;
  registerNo: any;
  list: any;
  //content:any;
  @ViewChild('content', { static: true }) content: ElementRef;

  canvasImage: any;
  canvasImage1: any;
  pdfTable: any;
  routeData: any;
  pdfvalue: any;
  regno: any;
  doc_name: any = [];
  profileurl: any;
  logoutdisplay: boolean = false;
  Reg_no: any;
  applicantDetails: any;
  year: any;

  sucessdisplay: boolean = false;
  errordisplay: boolean = false;
  finalSubmitConfirmation:boolean = false;
  isAllowedToGoBack: boolean;
  applicationStatus: any;
  isApplicationCompleted: boolean = true;
  constructor(
    private route: ActivatedRoute,
    public contentService: ContentService,
    private messageService: MessageService,
    public router: Router,
    private userSessionService: UserSessionService,
    public fb: FormBuilder,
    public datepipe: DatePipe
  ) {
    this.regno = this.userSessionService.regId();
    this.routeData = this.route.snapshot;
    this.pdfvalue = this.routeData.queryParams.pdfvalue;  
  }

  ngOnInit() {
    this.initialValidator();
     this.onData();
  }


  initialValidator() {
    this.form = this.fb.group({
      'photo_filepath': new FormControl('', null),
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
      "category": new FormControl('', null),
      "sub_category": new FormControl('', null),
      "udise_code": new FormControl('', null),
      "register_no": new FormControl('', null),
      "acad_yr": new FormControl('', null),
      "appli_complete_date": new FormControl('', null),

      "address": new FormControl('', null),
      schoolnew_schoollist_details: this.fb.array([]),

    });
  }
  onData() {
        this.contentService.getStudentListData(this.regno).subscribe(result => {
          debugger;
          this.list = result.allstuds.registration_pdf_list[0];
          this.list.gender = this.list.gender == "male" ? "Male" : "Female";
          this.list.dob = this.datepipe.transform(this.list.dob, 'dd-MM-yyyy');
         
          
          this.form.patchValue(this.list);
          this.applicationStatus =  this.list.appli_status;
          this.Reg_no = this.list.register_no;
          this.profileurl = this.list.photo_filepath;
          this.getSchoolList(result.allstuds.school_applied_list);

          if (this.list['class'] == 1) {
            this.form.controls['class'].setValue("I");
          }
          else if (this.list['class'] == 13) {
            this.form.controls['class'].setValue("LKG");
          }
          else {
            this.form.controls['class'].setValue("-");
          }
          if(this.list.appli_complete_date != "0000-00-00 00:00:00")
          {
            this.list.appli_complete_date = this.datepipe.transform(this.list.appli_complete_date, 'dd-MM-yyyy,h:mm: a');
            this.isApplicationCompleted = false;
          }
          else {
            this.form.controls['appli_complete_date'].setValue("");
            this.isApplicationCompleted = true;
            
          }
         
        });
      }
  

  showConfirmation() {
    this.logoutdisplay = true;
  }
  onLogout() {
    this.router.navigate(['/home'])   
  }
  cancel() {
    this.logoutdisplay = false;
  }

  onPdf() {
debugger;
this.finalSubmitConfirmation = false;
    this.contentService.getApplicantData(this.regno).subscribe((data) => {
      this.applicantDetails = data.result;
      if (this.applicantDetails.photo_filepath != '' && this.applicantDetails.proof_of_birth_filepath != ''
        && this.applicantDetails.parent_id_filepath != '' && this.applicantDetails.address_proof_filepath != ''
        && this.applicantDetails.other_certifi_filepath != '') {
          let today = new Date();
          this.year = today.getFullYear();
          var records = {
            "records":
            {
              "register_no": this.regno,
              "appli_status": "1",
              "acad_yr":this.year 
            }
          }
        this.contentService.saveFinalSubmit(records).subscribe(res => {
         if(res.dataStatus === true) {
         // this.sucessdisplay = true;
          this.onData();
          this.messageService.add({ severity: 'success', summary: 'Submited Successsfully!', detail: '' });
         }
         });
        }
        else {
         // this.messageService.add({ severity: 'success', summary: 'Records Updated Successfully', detail: '' });
         
         this.errordisplay = true;
          //this.messageService.add({ severity: 'warn', summary: 'Please upload all documents', detail: '' });
        }
      });
  }

  goBack() {
    this.router.navigate(['/reg-personal'], { queryParams: { 'registerNo': this.Reg_no }, skipLocationChange: false })
  }
printPdf() {
  window.print();
}
  onPrint() {
    window.print();
    var records = {
      "records":
      {
        "register_no": this.regno,
        "appli_status": "1",
        "acad_yr":this.year,
        "appli_complete_date":""
      
      }
    }
  this.contentService.saveFinalSubmit(records).subscribe(res => {
   if(res.dataStatus === true) {
    window.print();
   }
   });
  }


  getSchoolList(item) {
    const schoollist = this.form.controls.schoolnew_schoollist_details as FormArray;
    while (schoollist.length !== 0) {
      schoollist.removeAt(0)
    }
    for (let i = 0; i < item.length; i++) {
      schoollist.push(this.fb.group({
        school: item[i].school,
        udise_code: item[i].udise_code
      })
      )
    }
  }
  showConfirmationforFinalSubmit() {
    this.finalSubmitConfirmation = true;
  }
  cancelFinalSubmit() {
    this.finalSubmitConfirmation = false;
  }
}
