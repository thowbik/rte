import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegParentComponent } from './reg-parent/reg-parent.component';
import { RegAddressComponent } from './reg-address/reg-address.component';
import { RegDocumentComponent } from './reg-document/reg-document.component';
import { RegSchoolComponent } from './reg-school/reg-school.component';

const routes: Routes = [
  {
    path: 'reg-parent',
    component: RegParentComponent,
    data: {
        title: 'Parent Details'
    }
  },
  {
    path: 'reg-address',
    component: RegAddressComponent,
    data: {
        title: 'Address Details'
    }
  },
  {
    path: 'reg-document',
    component: RegDocumentComponent,
    data: {
        title: 'Document Details'
    }
  },
  {
    path: 'reg-school',
    component: RegSchoolComponent,
    data: {
        title: 'School Details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
