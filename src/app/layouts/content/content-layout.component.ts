import { Component, OnInit, AfterViewInit, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
// import { ConfigService } from 'app/shared/services/config.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss']
})

export class ContentLayoutComponent implements OnInit, AfterViewInit {
  display: boolean = false;
 


  constructor( public router: Router
    ) { }

  ngOnInit() {
  }
  showConfirmation()
  {
    this.display = true;
  }
  onLogout() {
    this.router.navigate(['/home'])
  }
  cancel() {
    this.display = false;
  }

  ngAfterViewInit() {
}
}
