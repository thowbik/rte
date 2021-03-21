import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RteComponent } from './rte.component';
import { RteIntakecapacityComponent } from './rte-intakecapacity/rte-intakecapacity.component';

const routes: Routes = [
    {
        path: 'rte-intake',
        component: RteIntakecapacityComponent,
        data: {
            title: 'RTE Inatake Capacity'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RteRoutingModule { }
