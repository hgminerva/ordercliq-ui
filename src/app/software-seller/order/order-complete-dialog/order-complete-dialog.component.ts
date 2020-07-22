import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '../order.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppSettings } from './../../../app-settings';

@Component({
  selector: 'app-order-complete-dialog',
  templateUrl: './order-complete-dialog.component.html',
  styleUrls: ['./order-complete-dialog.component.css']
})
export class OrderCompleteDialogComponent implements OnInit {

  constructor(
    public orderCompleteDialogComponent: MatDialogRef<OrderCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public orderCompleteDialogData: any,
    public orderService: OrderService,
    private snackBar: MatSnackBar,
    public appSettings: AppSettings
  ) { }

  public dialogTitle: string = "Complete";
  public dialogContent: string = this.orderCompleteDialogData.content;

  public completeOrderSubscription: any;

  public buttonOrderCompleteDialogCompleteClick(): void {
    let buttonOrderCompleteDialogComplete: Element = document.getElementById("buttonOrderCompleteDialogComplete");
    let buttonOrderCompleteDialogClose: Element = document.getElementById("buttonOrderCompleteDialogClose");

    buttonOrderCompleteDialogComplete.setAttribute("disabled", "disabled");
    buttonOrderCompleteDialogClose.setAttribute("disabled", "disabled");

    this.orderService.completeOrder(this.orderCompleteDialogData.orderData.Id);
    this.completeOrderSubscription = this.orderService.completeOrderObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.snackBar.open('Order no. ' + this.orderCompleteDialogData.orderData.OrderNumber + ' was successfully completed!', '', {
            duration: 3000,
            horizontalPosition: this.appSettings.snackBarHorizontalPosition,
            verticalPosition: this.appSettings.snackBarVerticalPosition,
            panelClass: ["green-snackbar"]
          });

          this.orderCompleteDialogComponent.close(200);
        } else if (data[0] == "failed") {
          this.snackBar.open(data[1], '', {
            duration: 3000,
            horizontalPosition: this.appSettings.snackBarHorizontalPosition,
            verticalPosition: this.appSettings.snackBarVerticalPosition,
            panelClass: ["orange-snackbar"]
          });

          buttonOrderCompleteDialogComplete.removeAttribute("disabled");
          buttonOrderCompleteDialogClose.removeAttribute("disabled");
        }

        if (this.completeOrderSubscription != null) this.completeOrderSubscription.unsubscribe();
      }
    );
  }

  public buttonOrderCompleteDialogCloseClick(): void {
    this.orderCompleteDialogComponent.close();
    if (this.completeOrderSubscription != null) this.completeOrderSubscription.unsubscribe();
  }

  ngOnInit(): void {

  }
  
  ngOnDestroy() {
    if (this.completeOrderSubscription != null) this.completeOrderSubscription.unsubscribe();
  }
}
