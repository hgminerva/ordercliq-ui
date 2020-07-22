import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoftwareSellerRouterActivate } from './software-seller.router.activate';

import { SoftwareSellerComponent } from './software-seller.component';
import { DashboardComponent } from '../software-seller/dashboard/dashboard.component';
import { ProductComponent } from '../software-seller/product/product.component';
import { OrderComponent } from '../software-seller/order/order.component';
import { ProfileComponent } from '../software-seller/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [SoftwareSellerRouterActivate],
    component: SoftwareSellerComponent,
    children: [
      { path: '', canActivate: [SoftwareSellerRouterActivate], component: DashboardComponent },
      { path: 'product', canActivate: [SoftwareSellerRouterActivate], component: ProductComponent },
      { path: 'order', canActivate: [SoftwareSellerRouterActivate], component: OrderComponent },
      { path: 'profile', canActivate: [SoftwareSellerRouterActivate], component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareSellerRoutingModule { }
