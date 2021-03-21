import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/services/navigation.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { AlertService } from 'src/services/alert.service';
import { UserSessionService } from 'src/services/usersession.service';
// import { NavigationService } from 'services/navigation.service';
// import { AlertService } from 'services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  schoolTypeId: number;
  applicationStatus: number;
  constructor(private router: Router,
    private authService: AuthenticationService,
    private route: ActivatedRoute, 
    private navigationService: NavigationService,
    private alertService: AlertService,
    private userSessionService : UserSessionService,
  ) {
   
  }

  ngOnInit() {
    this.authService.logOut();
    this.initializeValidators();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initializeValidators() {
    this.loginForm = new FormGroup({
      regId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    debugger;
     if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.regId, this.loginForm.value.password).subscribe((data) => {
        debugger;
        if(data.dataStatus) {
      debugger;
      this.applicationStatus = this.userSessionService.applicationStatus();
      if(this.applicationStatus == 1) {
        this.router.navigate(['/rte-pdf']);
      }
      else {
        this.router.navigate(['/reg-parent']);
      }
            
            //this.router.navigate([this.returnUrl])
              
        }
        else {
        this.alertService.error(data.message);
        }
       
      });
    // } else {
    //   this.validateFormControl();
     }
  }


  validateFormControl() {
    Object.keys(this.loginForm.controls).forEach(field => {
      const control = this.loginForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }


  // On registration link click
  onRegister() {
    this.router.navigate(['/register']);
  }

  openAddFileDialog() {

  }

}
