import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppSettings } from './../../../app-settings';

@Component({
  selector: 'app-order-verify-dialog',
  templateUrl: './order-verify-dialog.component.html',
  styleUrls: ['./order-verify-dialog.component.css']
})
export class OrderVerifyDialogComponent implements OnInit {

  constructor(
    public orderVerifyDialogComponent: MatDialogRef<OrderVerifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderVerifyDialogData: any,
    public orderService: OrderService,
    private snackBar: MatSnackBar,
    public appSettings: AppSettings
  ) { }

  public dialogTitle: string = "Verify";
  public dialogContent: string = this.orderVerifyDialogData.content;

  public verifyOrderSubscription: any;

  public buttonOrderVerifyDialogVerifyClick(): void {
    let buttonOrderVerifyDialogVerify: Element = document.getElementById("buttonOrderVerifyDialogVerify");
    let buttonOrderVerifyDialogClose: Element = document.getElementById("buttonOrderVerifyDialogClose");

    buttonOrderVerifyDialogVerify.setAttribute("disabled", "disabled");
    buttonOrderVerifyDialogClose.setAttribute("disabled", "disabled");

    this.orderService.verifyOrder(this.orderVerifyDialogData.orderData.Id);
    this.verifyOrderSubscription = this.orderService.verifyOrderObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.snackBar.open('Order no. ' + this.orderVerifyDialogData.orderData.OrderNumber + ' was successfully verified!', '', {
            duration: 3000,
            horizontalPosition: this.appSettings.snackBarHorizontalPosition,
            verticalPosition: this.appSettings.snackBarVerticalPosition,
            panelClass: ["green-snackbar"]
          });

          this.orderVerifyDialogComponent.close(200);
        } else if (data[0] == "failed") {
          this.snackBar.open(data[1], '', {
            duration: 3000,
            horizontalPosition: this.appSettings.snackBarHorizontalPosition,
            verticalPosition: this.appSettings.snackBarVerticalPosition,
            panelClass: ["orange-snackbar"]
          });

          buttonOrderVerifyDialogVerify.removeAttribute("disabled");
          buttonOrderVerifyDialogClose.removeAttribute("disabled");
        }

        if (this.verifyOrderSubscription != null) this.verifyOrderSubscription.unsubscribe();
      }
    );
  }

  public buttonOrderVerifyDialogCloseClick(): void {
    this.orderVerifyDialogComponent.close();
    if (this.verifyOrderSubscription != null) this.verifyOrderSubscription.unsubscribe();
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.verifyOrderSubscription != null) this.verifyOrderSubscription.unsubscribe();
  }
}
