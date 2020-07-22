import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountRouterActivate } from './account-router.activate';

import { AccountComponent } from './account.component';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AccountRouterActivate],
    component: AccountComponent,
    children: [
      { path: '', canActivate: [AccountRouterActivate], component: LoginComponent },
      { path: 'login/:productId', canActivate: [AccountRouterActivate], component: LoginComponent },
      { path: 'register/:user_type/:productId', canActivate: [AccountRouterActivate], component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
