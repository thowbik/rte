import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// declare let L;
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  cars: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    ) {
      this.router = router;
  }

  ngOnInit() {
    
 
  }
  goToExam()
  {
    this.router.navigate(['/exam']);
  }
}