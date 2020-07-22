import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoftwareBuyerRouterActivate } from './software-buyer-router.activate';

import { SoftwareBuyerComponent } from './software-buyer.component';
import { DashboardComponent } from '../software-buyer/dashboard/dashboard.component';
import { OrderComponent } from '../software-buyer/order/order.component';
import { ProfileComponent } from '../software-buyer/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [SoftwareBuyerRouterActivate],
    component: SoftwareBuyerComponent,
    children: [
      { path: '', canActivate: [SoftwareBuyerRouterActivate], component: DashboardComponent },
      { path: 'order', canActivate: [SoftwareBuyerRouterActivate], component: OrderComponent },
      { path: 'profile', canActivate: [SoftwareBuyerRouterActivate], component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareBuyerRoutingModule { }
