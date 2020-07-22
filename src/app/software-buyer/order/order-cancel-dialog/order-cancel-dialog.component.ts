import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppSettings } from './../../../app-settings';

@Component({
  selector: 'app-order-cancel-dialog',
  templateUrl: './order-cancel-dialog.component.html',
  styleUrls: ['./order-cancel-dialog.component.css']
})
export class OrderCancelDialogComponent implements OnInit {

  constructor(
    public orderCancelDialogComponent: MatDialogRef<OrderCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderCancelDialogData: any,
    public orderService: OrderService,
    private snackBar: MatSnackBar,
    public appSettings: AppSettings
  ) { }

  public dialogTitle: string = "Cancel";
  public dialogContent: string = this.orderCancelDialogData.content;

  public cancelOrderSubscription: any;

  public buttonOrderCancelDialogCancelClick(): void {
    let buttonOrderCancelDialogCancel: Element = document.getElementById("buttonOrderCancelDialogCancel");
    let buttonOrderCancelDialogClose: Element = document.getElementById("buttonOrderCancelDialogClose");

    buttonOrderCancelDialogCancel.setAttribute("disabled", "disabled");
    buttonOrderCancelDialogClose.setAttribute("disabled", "disabled");

    this.orderService.cancelOrder(this.orderCancelDialogData.orderData.Id);
    this.cancelOrderSubscription = this.orderService.cancelOrderObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.snackBar.open('Order no. ' + this.orderCancelDialogData.orderData.OrderNumber + ' was successfully cancelled!', '', {
            duration: 3000,
            horizontalPosition: this.appSettings.snackBarHorizontalPosition,
            verticalPosition: this.appSettings.snackBarVerticalPosition,
            panelClass: ["green-snackbar"]
          });

          this.orderCancelDialogComponent.close(200);
        } else if (data[0] == "failed") {
          this.snackBar.open(data[1], '', {
            duration: 3000,
            horizontalPosition: this.appSettings.snackBarHorizontalPosition,
            verticalPosition: this.appSettings.snackBarVerticalPosition,
            panelClass: ["orange-snackbar"]
          });

          buttonOrderCancelDialogCancel.removeAttribute("disabled");
          buttonOrderCancelDialogClose.removeAttribute("disabled");
        }

        if (this.cancelOrderSubscription != null) this.cancelOrderSubscription.unsubscribe();
      }
    );
  }

  public buttonOrderCancelDialogCloseClick(): void {
    this.orderCancelDialogComponent.close();
    if (this.cancelOrderSubscription != null) this.cancelOrderSubscription.unsubscribe();
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.cancelOrderSubscription != null) this.cancelOrderSubscription.unsubscribe();
  }
}
