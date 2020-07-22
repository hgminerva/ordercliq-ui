import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkColumnDef } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SoftwareSellerRoutingModule } from './software-seller-routing.module';
import { SoftwareSellerRouterActivate } from './software-seller.router.activate';

import { SoftwareSellerComponent } from './software-seller.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailDialogComponent } from './product/product-detail-dialog/product-detail-dialog.component';
import { ProductDeleteDialogComponent } from './product/product-delete-dialog/product-delete-dialog.component';
import { ProductCreateOrderLinkDialogComponent } from './product/product-create-order-link-dialog/product-create-order-link-dialog.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailDialogComponent } from './order/order-detail-dialog/order-detail-dialog.component';
import { OrderVerifyDialogComponent } from './order/order-verify-dialog/order-verify-dialog.component';
import { OrderCancelDialogComponent } from './order/order-cancel-dialog/order-cancel-dialog.component';
import { OrderCompleteDialogComponent } from './order/order-complete-dialog/order-complete-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    SoftwareSellerComponent,
    ProductComponent,
    ProductDetailDialogComponent,
    ProductDeleteDialogComponent,
    ProductCreateOrderLinkDialogComponent,
    OrderComponent,
    OrderDetailDialogComponent,
    OrderVerifyDialogComponent,
    OrderCancelDialogComponent,
    OrderCompleteDialogComponent,
    DashboardComponent,
    ProfileComponent
  ],
  entryComponents: [
    OrderDetailDialogComponent,
    OrderVerifyDialogComponent,
    OrderCancelDialogComponent,
    OrderCompleteDialogComponent,
    ProductDetailDialogComponent,
    ProductDeleteDialogComponent,
    ProductCreateOrderLinkDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SoftwareSellerRoutingModule,
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    MatStepperModule,
    FlexLayoutModule
  ],
  providers: [
    CdkColumnDef,
    SoftwareSellerRouterActivate
  ]
})
export class SoftwareSellerModule { }
