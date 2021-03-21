import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { FullLayoutService } from '../full-layout.service';
import { NavigationService } from 'src/services/navigation.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserSessionService } from 'src/services/usersession.service';

@Component({
  selector: 'app-reg-document',
  templateUrl: './reg-document.component.html',
  styleUrls: ['./reg-document.component.scss'],
  providers: [MessageService]
})
export class RegDocumentComponent implements OnInit {
  
  doc_name:any;
  doc_name1:any;
  doc_name2:any ;
  doc_name3:any ;
  doc_name4:any;
  profileurl: any;
  profileurl1: any;
  profileurl2:any;
  profileurl3: any;
  profileurl4: any;
  profileurl5:any;
  documentDetailsForm: FormGroup;
  studentPic: any;
  imageFile: File;
  formvalues: any = [];
  stuimage: any;
  birthproof: any;
  parentid: any;
  addressproof: any;
  routeData: any;
  catvalue: any;
  appvalue: any;
  logoutdisplay: boolean = false;
  fileToUpload: File = null;
  registerNo: number;

  applicantDetails: any;
  isAllowedToEdit: boolean = false;
  
  constructor(public router:Router,
    public alertService: AlertService,
    public contentService: FullLayoutService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    private authService : AuthenticationService,
    private navigationService: NavigationService,
    private userSessionService: UserSessionService) { 
      debugger;
      this.routeData = this.route.snapshot;
     // this.catvalue = this.routeData.queryParams.categoryvalue;
      this.registerNo = this.userSessionService.regId();
     
    }

  ngOnInit() {
    this.initialValidator();
    if(this.registerNo != 0)
    {
      this.getApplicantDetails();
    }
  

  }

  getApplicantDetails() {
    debugger;
    this.contentService.getApplicantData(this.registerNo).subscribe((res) => {
      this.applicantDetails = res.result;
      debugger;
      if(this.applicantDetails)
      {
        this.isAllowedToEdit = this.applicantDetails['appli_status'] != 0 ? true : false;
        this.catvalue=res.result.app_category;
        this.documentDetailsForm.patchValue(this.applicantDetails);
        this.profileurl=this.applicantDetails.photo_filepath;
        this.profileurl1=this.applicantDetails.proof_of_birth_filepath;
        this.profileurl2=this.applicantDetails.parent_id_filepath;
        this.profileurl3=this.applicantDetails.address_proof_filepath;
        this.profileurl4=this.applicantDetails.other_certifi_filepath;
      }
 
    
      
    });
  }

  initialValidator() {
    this.documentDetailsForm = this.fb.group({
      'register_no' : new FormControl(this.registerNo, Validators.required),
      'studentimage':  new FormControl('', null),
      'birthproof':  new FormControl('', null),
      'parentid':  new FormControl('', null),
      'addressproof':  new FormControl('', null),
      'otherdoc':  new FormControl('', null)
    });
  }


  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
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

  onSchool() {
    this.router.navigate(['/reg-school']);
  }

  disabled() {
    console.log('disabled?');
    return true;
}
  imageInputChange(imageInput:any){
    debugger
    this.imageFile = imageInput.files[0];
  }

  onSelectStudentPic(event) {
    debugger;
    this.doc_name =  event.target.files;
    const photo = event.target.files[0];
      this.documentDetailsForm.get('studentimage').setValue(photo);
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= 102400) {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]); 
        fileReader.onload = (event: Event) => {
          this.profileurl = fileReader.result;
          this.documentDetailsForm.controls.studentimage.setValue(fileReader.result);
        };
      } else {
        this.messageService.add({severity:'warn', summary: 'Image Can`t uploaded because Image size should not exceed 100 KB', detail:''})
      }
    }
  }

  onSelectBirthProof(event) {
    
    const proof_of_birth = event.target.files[0];
      this.documentDetailsForm.get('birthproof').setValue(proof_of_birth);
   this.doc_name1 =  event.target.files;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= 1000000) {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]); 
        fileReader.onload = (event: Event) => {
          this.profileurl1= fileReader.result;
          this.documentDetailsForm.controls.birthproof.setValue(fileReader.result);
        };
      } else {
        this.messageService.add({severity:'warn', summary: 'Image Can`t uploaded because Image size should not exceed 1 MB', detail:''});
      }
    }
  }


  onSelectParentId(event) {
    const parent_id = event.target.files[0];
    this.documentDetailsForm.get('parentid').setValue(parent_id);
   this.doc_name2 =  event.target.files;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= 1000000) {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]); 
        fileReader.onload = (event: Event) => {
          this.profileurl2= fileReader.result;
          this.documentDetailsForm.controls.parentid.setValue(fileReader.result);
        };
      } else {
        this.messageService.add({severity:'warn', summary: 'Image Can`t uploaded because Image size should not exceed 1 MB', detail:''});

       // this.alertService.warning('Image Can`t uploaded because Image size should not exceed 1 MB');
      }
    }
  }
  
  onSelectAddressProof(event) {
    const address_proof = event.target.files[0];
    this.documentDetailsForm.get('addressproof').setValue(address_proof);
    this.doc_name3 =  event.target.files;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= 1000000) {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]); 
        fileReader.onload = (event: Event) => {
          this.profileurl3= fileReader.result;
          this.documentDetailsForm.controls.addressproof.setValue(fileReader.result);
        };
      } else {
        this.messageService.add({severity:'warn', summary: 'Image Can`t uploaded because Image size should not exceed 1 MB', detail:''});
      }
    }
  }


  onSelectOtherProof(event) {
    const other_certifi = event.target.files[0];
    this.documentDetailsForm.get('otherdoc').setValue(other_certifi);
     this.doc_name4 =  event.target.files;
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size <= 1000000) {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]); 
        fileReader.onload = (event: Event) => {
          this.profileurl4= fileReader.result;
          this.documentDetailsForm.controls.otherdoc.setValue(fileReader.result);
        };
      } else {
        this.messageService.add({severity:'warn', summary: 'Image Can`t uploaded because Image size should not exceed 1 MB', detail:''});
      }
    }
  }



  

 onSaveDocument() {
debugger
  //  if(this.documentDetailsForm.value.studentimage !=''&& this.documentDetailsForm.value.birthproof !='' &&
  //  this.documentDetailsForm.value.parentid !=''&& this.documentDetailsForm.value.addressproof !='') {
  // if(this.documentDetailsForm.value.otherdoc !='') {
  //if(this.documentDetailsForm.valid) {
    const documentData = new FormData();
    this.formvalues = {
      "student_rte_appli":
      {
        "register_no": this.documentDetailsForm.value.register_no,
        "appli_complete_date": "12345",
        // "acad_yr":"2018",
        // "photo":"",
        // "photo_filepath":"",
        // "proof_of_birth":"",
        // "proof_of_birth_filepath":"",
        // "parent_id":"",
        // "parent_id_filepath":"",
        // "address_proof":"",
        // "address_proof_filepath":"",
        // "other_certifi":"",
        // "other_certifi_filepath":"",

      }
    }
    documentData.append('records', JSON.stringify(this.formvalues));
    if(this.doc_name != undefined) {
      documentData.append('doc_1', this.doc_name[0]);
    }
    
    if(this.doc_name1 != undefined) {
      documentData.append('doc_2', this.doc_name1[0]);
    }
    
    if(this.doc_name2 != undefined) {
      documentData.append('doc_3', this.doc_name2[0]);
    }
    

    if(this.doc_name3 != undefined) {
      documentData.append('doc_4', this.doc_name3[0]);
    }
   

    if(this.doc_name4 != undefined) {
      documentData.append('doc_5', this.doc_name4[0]);
    }
   
  
    
    


    // documentData.append('records', JSON.stringify(this.formvalues));
    // documentData.append('photo', this.documentDetailsForm.get('studentimage').value);
    // documentData.append('proof_of_birth', this.documentDetailsForm.get('birthproof').value);
    // documentData.append('parent_id', this.documentDetailsForm.get('parentid').value);
    // documentData.append('address_proof', this.documentDetailsForm.get('addressproof').value);
    // documentData.append('other_certifi', this.documentDetailsForm.get('otherdoc').value);
    // console.log(this.documentDetailsForm.value);

    this.contentService.getStudentDocuments(documentData).subscribe((parentresult) => {
      debugger;
      if (parentresult.dataStatus == true) {
      this.messageService.add({severity:'success', summary: 'Records Updated Successfully', detail:''});
      this.router.navigate(['reg-school'],  {queryParams: {'value':this.appvalue,'registerNo':this.registerNo}, skipLocationChange: false}); 
      }
      else {
        this.messageService.add({severity:'warn', summary: 'Failed', detail:''}); 
      }
    });
  }
//   else {
//     this.messageService.add({severity:'warn', summary: 'Please upload all proof', detail:''});
//   }
// }
// else {
//   this.messageService.add({severity:'warn', summary: 'Please choose category in parent details', detail:''});
// }
//  }
//  else {
//   this.messageService.add({severity:'warn', summary: 'Please choose all proff', detail:''});
// }

//  }



}
