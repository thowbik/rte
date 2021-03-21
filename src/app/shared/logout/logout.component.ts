import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  display: boolean = false;
  constructor(public router: Router) { }

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

}
