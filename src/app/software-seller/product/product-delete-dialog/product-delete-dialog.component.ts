import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppSettings } from './../../../app-settings';

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html',
  styleUrls: ['./product-delete-dialog.component.css']
})
export class ProductDeleteDialogComponent implements OnInit {

  constructor(
    public productDeleteDialogComponent: MatDialogRef<ProductDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productDeleteDialogData: any,
    public productService: ProductService,
    private snackBar: MatSnackBar,
    public appSettings: AppSettings
  ) { }

  public dialogTitle: string = "Delete Product";
  public dialogContent: string = this.productDeleteDialogData.content;

  public deleteProductSubscription: any;

  public buttonProductDeleteDialogDeleteClick(): void {
    let buttonProductDeleteDialogDelete: Element = document.getElementById("buttonProductDeleteDialogDelete");
    let buttonProductDeleteDialogClose: Element = document.getElementById("buttonProductDeleteDialogClose");

    buttonProductDeleteDialogDelete.setAttribute("disabled", "disabled");
    buttonProductDeleteDialogClose.setAttribute("disabled", "disabled");

    this.productService.deleteProduct(this.productDeleteDialogData.productData.Id);
    this.deleteProductSubscription = this.productService.deleteProductObservable.subscribe(
      data => {
        if (data[0] == "success") {
          this.snackBar.open('Product no. ' + this.productDeleteDialogData.productData.ProductCode + ' was successfully deleted!', '', {
            duration: 3000,
            horizontalPosition: this.appSettings.snackBarHorizontalPosition,
            verticalPosition: this.appSettings.snackBarVerticalPosition,
            panelClass: ["green-snackbar"]
          });

          this.productDeleteDialogComponent.close(200);
        } else if (data[0] == "failed") {
          this.snackBar.open(data[1], '', {
            duration: 3000,
            horizontalPosition: this.appSettings.snackBarHorizontalPosition,
            verticalPosition: this.appSettings.snackBarVerticalPosition,
            panelClass: ["orange-snackbar"]
          });

          buttonProductDeleteDialogDelete.removeAttribute("disabled");
          buttonProductDeleteDialogClose.removeAttribute("disabled");
        }

        if (this.deleteProductSubscription != null) this.deleteProductSubscription.unsubscribe();
      }
    );
  }

  public buttonProductDeleteDialogCloseClick(): void {
    this.productDeleteDialogComponent.close();
    if (this.deleteProductSubscription != null) this.deleteProductSubscription.unsubscribe();
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    if (this.deleteProductSubscription != null) this.deleteProductSubscription.unsubscribe();
  }
}
