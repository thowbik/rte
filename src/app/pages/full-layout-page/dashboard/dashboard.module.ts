import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        CarouselModule
    ],
    exports: [],
    declarations: [
        DashboardComponent,
    ],
    providers: [],
})
export class DashboardModule { }
