import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { RteComponent } from './rte/rte.component';
import { FullLayoutService } from './full-layout.service';
import { RegAddressComponent } from './reg-address/reg-address.component';
import { RegDocumentComponent } from './reg-document/reg-document.component';
import { RegParentComponent } from './reg-parent/reg-parent.component';
import { RegSchoolComponent } from './reg-school/reg-school.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {KeyFilterModule} from 'primeng/keyfilter';
import {PickListModule} from 'primeng/picklist';
import { LogoutComponent } from 'src/app/shared/logout/logout.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FullPagesRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        TabViewModule,
        RadioButtonModule,
        CheckboxModule,
        MessagesModule,
        MessageModule,
        CalendarModule,
        DropdownModule,
        TableModule,
        MultiSelectModule,
        ToastModule,
        DialogModule,
        ButtonModule,
        SliderModule,
        KeyFilterModule,
        PickListModule,
    ],
    declarations: [RegAddressComponent,RegDocumentComponent,RegParentComponent,RegSchoolComponent],
    providers: [FullLayoutService],
})
export class FullPagesModule { }
