import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoftwareBuyerOrderRouterActivate } from './software-buyer-oder.router.activate';

import { SoftwareBuyerOrderComponent } from './software-buyer-order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';

const routes: Routes = [
  {
    path: '',
    component: SoftwareBuyerOrderComponent,
    children: [
      { path: '', component: CreateOrderComponent },
      { path: 'create-order/:productId', canActivate: [SoftwareBuyerOrderRouterActivate], component: CreateOrderComponent },
      { path: 'confirm-order/:id', component: ConfirmOrderComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoftwareBuyerOrderRoutingModule { }
