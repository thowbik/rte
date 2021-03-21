import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DialogModule} from 'primeng/dialog';
// COMPONENTS


// DIRECTIVES
import { ComponentsModule } from './component/components.module';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
    exports: [
        CommonModule,
        NgbModule,
        DialogModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        ComponentsModule,
        DialogModule
    ],
    declarations: []
    
})
export class SharedModule { }
