import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { RteIntakeComponent } from './rte-intake/rte-intake.component';
import { RtePdfComponent } from './rte-pdf/rte-pdf.component';
import { RegPersonalComponent } from './reg-personal/reg-personal.component';;
import { HomesampleComponent } from './homesample/homesample.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


const routes: Routes = [
  {
    path: 'home',
    component: LandingComponent,
    data: {
        title: 'Home'
    }
},
{
  path: 'home1',
  component: HomesampleComponent,
  data: {
      title: 'Home'
  }
},
  {
      path: 'login',
      //path: 'login',
      component: LoginComponent,
      data: {
          title: 'Login'
      }
  },
  {
    path: 'register',
    //path: 'login',
    component: RegisterComponent,
    data: {
        title: 'Register'
    }
},
{
  path: 'rte-intake-capacity',
  //path: 'login',
  component: RteIntakeComponent,
  data: {
      title: 'RTE'
  }
},
{
  path: 'contact',
  //path: 'login',
  component: ContactUsComponent,
  data: {
      title: 'Contact'
  }
},
{
  path: 'rte-pdf',
  component: RtePdfComponent,
  data: {
      title: 'RTE'
  }
},
{
  path: 'reg-personal',
  component: RegPersonalComponent,
  data: {
      title: 'Personal Details'
  }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
