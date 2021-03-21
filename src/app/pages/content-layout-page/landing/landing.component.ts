import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  display: boolean = false;
  resumeDetailsForm: FormGroup;
  submitted: boolean;
  registerNo: number;
  

  constructor(public router : Router,
    private fb: FormBuilder,
    private contentService : ContentService) { }

  ngOnInit() {
    this.initialValidator();
  }
  initialValidator() {
    debugger;
    this.resumeDetailsForm = this.fb.group({
      'register_id': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }
  onLogin() {
  this.router.navigate(['/rte-intake-capacity']);
  }
  onContact() {
    this.router.navigate(['/contact']); 
  }
  onStart(){
    this.router.navigate(['/reg-personal']);

    //  this.router.navigate(['/reg-personal']);
  }

  resumeDialog() {
    this.router.navigate(['/login']);
  }
  onResume() {
    debugger;
    this.submitted = true;
    if(this.resumeDetailsForm.valid) {
      var records = {
        "records": {
            "register_no": this.resumeDetailsForm.value.register_id,
            "password": this.resumeDetailsForm.value.password
          }
        }
        this.registerNo = this.resumeDetailsForm.value.register_id;
          // this.router.navigate(['reg-personal'], {queryParams: {'registerNo':this.registerNo }, skipLocationChange: true});
      this.contentService.resumeApplication(records).subscribe((result) => {
        if (result.dataStatus == true) {
          debugger;
          this.display = false;
          this.registerNo = this.resumeDetailsForm.value.register_id
          this.router.navigate(['reg-personal'],  {queryParams: {'registerNo':this.registerNo }, skipLocationChange: true});
        }
      
      });
     
    
    }
    }
   
}
