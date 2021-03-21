import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homesample',
  templateUrl: './homesample.component.html',
  styleUrls: ['./homesample.component.scss']
})
export class HomesampleComponent implements OnInit {

  constructor(public router: Router,) { }

  ngOnInit() {
  }
  goToIntakeCapacity() {
    this.router.navigate(['/rte-intake-capacity']);
  }
  viewContactList() {
    this.router.navigate(['/contact']);
  }
}
