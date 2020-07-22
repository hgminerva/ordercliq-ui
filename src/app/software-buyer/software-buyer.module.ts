import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkColumnDef } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SoftwareBuyerRoutingModule } from './software-buyer-routing.module';
import { SoftwareBuyerRouterActivate } from './software-buyer-router.activate';

import { SoftwareBuyerComponent } from './software-buyer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderComponent } from './order/order.component';
import { OrderCancelDialogComponent } from './order/order-cancel-dialog/order-cancel-dialog.component';
import { OrderDetailDialogComponent } from './order/order-detail-dialog/order-detail-dialog.component';
import { ProfileComponent } from './profile/profile.component';

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
    SoftwareBuyerComponent,
    DashboardComponent,
    OrderComponent,
    OrderCancelDialogComponent,
    OrderDetailDialogComponent,
    ProfileComponent
  ],
  entryComponents: [
    OrderCancelDialogComponent,
    OrderDetailDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SoftwareBuyerRoutingModule,
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
    SoftwareBuyerRouterActivate
  ]
})
export class SoftwareBuyerModule { }
