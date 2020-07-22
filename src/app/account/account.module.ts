import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { AccountRoutingModule } from './account-routing.module';
import { AccountRouterActivate } from './account-router.activate';

import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { LoginErrorDialogComponent } from './login/login-error-dialog/login-error-dialog.component';
import { RegisterComponent } from './register/register.component';
import { RegisterErrorDialogComponent } from './register/register-error-dialog/register-error-dialog.component';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    LoginErrorDialogComponent,
    RegisterComponent,
    RegisterErrorDialogComponent
  ],
  entryComponents: [
    LoginErrorDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatDividerModule,
    MatRadioModule,
    FlexLayoutModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    AccountRouterActivate
  ]
})
export class AccountModule { }
