import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';
import {RadioButtonModule} from 'primeng/radiobutton';
import { RteComponent } from './rte.component';
import { RteRoutingModule } from './rte-routing.module';
import { RteIntakecapacityComponent } from './rte-intakecapacity/rte-intakecapacity.component';
import { RteService } from './rte.service';
@NgModule({
    imports: [
        RteRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        DropdownModule,
        MultiSelectModule,
        ToastModule,
        FormsModule,
        DialogModule,
        ButtonModule,
        SliderModule,
        CheckboxModule,
        CardModule,
        RadioButtonModule,
        FormsModule     
    ],
    exports: [],
    declarations: [
        RteComponent,
        RteIntakecapacityComponent,
    ],
    providers: [RteService],
})
export class RteModule { }
