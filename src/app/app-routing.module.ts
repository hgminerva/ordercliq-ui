import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'software-seller', loadChildren: () => import('./software-seller/software-seller.module').then(m => m.SoftwareSellerModule) },
  { path: 'software-buyer', loadChildren: () => import('./software-buyer/software-buyer.module').then(m => m.SoftwareBuyerModule) },
  { path: 'software-buyer-order', loadChildren: () => import('./software-buyer-order/software-buyer-order.module').then(m => m.SoftwareBuyerOrderModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
