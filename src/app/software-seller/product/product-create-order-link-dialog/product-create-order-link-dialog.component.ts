import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AppSettings } from './../../../app-settings';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-product-create-order-link-dialog',
  templateUrl: './product-create-order-link-dialog.component.html',
  styleUrls: ['./product-create-order-link-dialog.component.css']
})
export class ProductCreateOrderLinkDialogComponent implements OnInit {

  constructor(
    public productCreateOrderLinkDialogComponent: MatDialogRef<ProductCreateOrderLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productOrderLinkDialogData: any,
    private snackBar: MatSnackBar,
    public appSettings: AppSettings,
    public router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  public orderLink: string = "";

  public generateOrderLink(): void {
    const origin = this.document.location.origin;
    this.orderLink = origin + "/software-buyer-order/create-order/" + this.productOrderLinkDialogData.productData.Id;
  }

  public buttonProductOrderLinkDialogCloseClick(): void {
    this.productCreateOrderLinkDialogComponent.close();
  }

  ngOnInit(): void {
    this.generateOrderLink();
  }

  ngOnDestroy() {
  }
}
