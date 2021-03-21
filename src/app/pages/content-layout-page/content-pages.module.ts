import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from './content-pages-routing.module';
import { LoginComponent } from './login/login.component';
import {CardModule} from 'primeng/card';
import { RegisterComponent } from './register/register.component';
import { ContentService } from './content.service';
import {TabViewModule} from 'primeng/tabview';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';
import { LandingComponent } from './landing/landing.component';
import { RteIntakeComponent } from './rte-intake/rte-intake.component';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {SliderModule} from 'primeng/slider';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import { RtePdfComponent } from './rte-pdf/rte-pdf.component';
import {KeyFilterModule} from 'primeng/keyfilter';
import { RegPersonalComponent } from './reg-personal/reg-personal.component';
import {PickListModule} from 'primeng/picklist';
import { LogoutComponent } from 'src/app/shared/logout/logout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomesampleComponent } from './homesample/homesample.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {PasswordModule} from 'primeng/password';
import { DatePipe } from '@angular/common'




@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
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
        SharedModule,
        PasswordModule
        
    ],
    declarations: [LoginComponent, RegisterComponent, LandingComponent, RteIntakeComponent, RtePdfComponent, RegPersonalComponent,LogoutComponent, HomesampleComponent,ContactUsComponent],
    providers: [ContentService,DatePipe],
})
export class ContentPagesModule { }
