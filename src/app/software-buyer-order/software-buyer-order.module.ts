import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkColumnDef } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SoftwareBuyerOrderRoutingModule } from './software-buyer-order-routing.module';
import { SoftwareBuyerOrderRouterActivate } from './software-buyer-oder.router.activate';

import { SoftwareBuyerOrderComponent } from './software-buyer-order.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    SoftwareBuyerOrderComponent,
    CreateOrderComponent,
    ConfirmOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SoftwareBuyerOrderRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  providers: [
    CdkColumnDef,
    SoftwareBuyerOrderRouterActivate
  ]
})
export class SoftwareBuyerOrderModule { }
