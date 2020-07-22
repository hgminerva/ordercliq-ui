import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { OrderService } from './../order.service';
import { OrderDetailModel } from './order-detail.model';

import { AppSettings } from './../../../app-settings';

import { OrderVerifyDialogComponent } from '../order-verify-dialog/order-verify-dialog.component';
import { OrderCompleteDialogComponent } from '../order-complete-dialog/order-complete-dialog.component';
import { OrderCancelDialogComponent } from '../order-cancel-dialog/order-cancel-dialog.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.css']
})
export class OrderDetailDialogComponent implements OnInit {

  constructor(
    public orderDetailDialogComponent: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderDetailDialogData: any,
    public orderService: OrderService,
    private snackBar: MatSnackBar,
    public appSettings: AppSettings,
    private orderDetailDialog: MatDialog,
    private orderVerifyDialog: MatDialog,
    private orderCancelDialog: MatDialog
  ) { }

  public dialogTitle: string = this.orderDetailDialogData.title;
  public dialogContent: string = this.orderDetailDialogData.content;

  public orderStatus: string = this.orderDetailDialogData.status;

  public orderDetailSubscription: any;
  public orderDetailModel: OrderDetailModel = {
    Id: 0,
    OrderNumber: "",
    OrderDate: "",
    ProductCode: "",
    ProductManualCode: "",
    ProductSKUCode: "",
    ProductDescription: "",
    Remarks: "",
    ProductPrice: "",
    Quantity: "",
    Amount: "",
    SellerUserName: "",
    SellerFullName: "",
    BuyerUserName: "",
    BuyerFullName: "",
    BuyerAddress: "",
    BuyerContactNumber: "",
    Status: ""
  };

  public orderDetailSpinnerHidden: boolean = false;
  public orderDetailNotFoundHidden: boolean = true;
  public orderDetailSpinnerContentHidden: boolean = true;

  public buttonOrderDetailDialogVerifiedHidden: boolean = true;
  public buttonOrderDetailDialogCompleteHidden: boolean = true;
  public buttonOrderDetailDialogCancelHidden: boolean = true;

  public getOrderDetail(): void {
    let id: number = parseInt(this.orderDetailDialogData.orderData.Id);

    this.orderService.orderDetail(id);
    this.orderDetailSubscription = this.orderService.orderDetailObservable.subscribe(
      data => {
        if (data != null) {
          this.orderDetailModel = {
            Id: data.Id,
            OrderNumber: data.OrderNumber,
            OrderDate: data.OrderDate,
            ProductCode: data.ProductCode,
            ProductManualCode: data.ProductManualCode,
            ProductSKUCode: data.ProductSKUCode,
            ProductDescription: data.ProductDescription,
            Remarks: data.Remarks,
            ProductPrice: data.ProductPrice,
            Quantity: data.Quantity,
            Amount: data.Amount,
            SellerUserName: data.SellerUserName,
            SellerFullName: data.SellerFullName,
            BuyerUserName: data.BuyerUserName,
            BuyerFullName: data.BuyerFullName,
            BuyerAddress: data.BuyerAddress,
            BuyerContactNumber: data.BuyerContactNumber,
            Status: data.Status
          };

          this.orderDetailSpinnerHidden = true;
          this.orderDetailNotFoundHidden = true;
          this.orderDetailSpinnerContentHidden = false;
        } else {
          this.orderDetailSpinnerHidden = true;
          this.orderDetailNotFoundHidden = false;
          this.orderDetailSpinnerContentHidden = true;
        }

        if (this.orderDetailSubscription != null) this.orderDetailSubscription.unsubscribe();
      }
    );
  }

  public buttonOrderDetailDialogVerifiedClick(): void {
    const openOrderVerifyDialog = this.orderVerifyDialog.open(OrderVerifyDialogComponent, {
      width: '300px',
      data: {
        content: "Verify order no. " + this.orderDetailModel.OrderNumber + "?",
        orderData: this.orderDetailModel
      },
      disableClose: true
    });

    openOrderVerifyDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.orderDetailDialogComponent.close(200);
      }
    });
  }

  public buttonOrderDetailDialogCompleteClick(): void {
    const completeOrderVerifyDialog = this.orderVerifyDialog.open(OrderCompleteDialogComponent, {
      width: '300px',
      data: {
        content: "Complete order no. " + this.orderDetailModel.OrderNumber + "?",
        orderData: this.orderDetailModel
      },
      disableClose: true
    });

    completeOrderVerifyDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.orderDetailDialogComponent.close(200);
      }
    });
  }

  public buttonOrderDetailDialogCancelClick(): void {
    const openOrderCancelDialog = this.orderCancelDialog.open(OrderCancelDialogComponent, {
      width: '300px',
      data: {
        content: "Cancel order no. " + this.orderDetailModel.OrderNumber + "?",
        orderData: this.orderDetailModel
      },
      disableClose: true
    });

    openOrderCancelDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.orderDetailDialogComponent.close(200);
      }
    });
  }

  public buttonOrderDetailDialogCloseClick(): void {
    this.orderDetailDialogComponent.close();
  }

  ngOnInit(): void {
    if (this.orderStatus === "Open") {
      this.buttonOrderDetailDialogVerifiedHidden = false;
      this.buttonOrderDetailDialogCompleteHidden = true;
      this.buttonOrderDetailDialogCancelHidden = false;
    } else if (this.orderStatus === "Verified") {
      this.buttonOrderDetailDialogVerifiedHidden = true;
      this.buttonOrderDetailDialogCompleteHidden = false;
      this.buttonOrderDetailDialogCancelHidden = false;
    } else if (this.orderStatus === "Completed") {
      this.buttonOrderDetailDialogVerifiedHidden = true;
      this.buttonOrderDetailDialogCompleteHidden = true;
      this.buttonOrderDetailDialogCancelHidden = true;
    } else if (this.orderStatus === "Cancelled") {
      this.buttonOrderDetailDialogVerifiedHidden = true;
      this.buttonOrderDetailDialogCompleteHidden = true;
      this.buttonOrderDetailDialogCancelHidden = true;
    } else {
      this.buttonOrderDetailDialogVerifiedHidden = true;
      this.buttonOrderDetailDialogCompleteHidden = true;
      this.buttonOrderDetailDialogCancelHidden = true;
    }

    this.getOrderDetail();
  }

  ngOnDestroy() {
    if (this.orderDetailSubscription != null) this.orderDetailSubscription.unsubscribe();
  }
}
