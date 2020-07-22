import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { AppSettings } from './../../../app-settings';
import { ProductModel } from './../product.model';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.css']
})
export class ProductDetailDialogComponent implements OnInit {

  constructor(
    public productDetailDialogComponent: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public productDetailDialogData: any,
    public productService: ProductService,
    private snackBar: MatSnackBar,
    public appSettings: AppSettings,
    private uploadProductPhotoDialog: MatDialog,
  ) { }

  public dialogTitle: string = this.productDetailDialogData.title;
  public dialogContent: string = this.productDetailDialogData.content;

  public detailProductSubscription: any;
  public detailProductModel: ProductModel = {
    Id: 0,
    ProductCode: "",
    ProductManualCode: "",
    ProductSKUCode: "",
    ProductDescription: "",
    Particulars: "",
    ImageURL: "",
    Price: 0,
    SellerUserName: "",
    SellerFullName: "",
    Status: "",
  };

  public uploadProductPhotoSubscription: any;
  @ViewChild("productPhoto") productPhoto;

  public saveProductSubscription: any;

  public productDetailSpinnerHidden: boolean = false;
  public productDetailNotFoundHidden: boolean = true;
  public productDetailSpinnerContentHidden: boolean = true;

  public detailProduct(id: number) {
    this.productService.detailProduct(id);
    this.detailProductSubscription = this.productService.detailProductObservable.subscribe(
      data => {
        if (data != null) {
          this.detailProductModel = {
            Id: data.Id,
            ProductCode: data.ProductCode,
            ProductManualCode: data.ProductManualCode,
            ProductSKUCode: data.ProductSKUCode,
            ProductDescription: data.ProductDescription,
            Particulars: data.Particulars,
            ImageURL: data.ImageURL,
            Price: data.Price,
            SellerUserName: data.SellerUserName,
            SellerFullName: data.SellerFullName,
            Status: data.Status,
          };

          this.productDetailSpinnerHidden = true;
          this.productDetailNotFoundHidden = true;
          this.productDetailSpinnerContentHidden = false;
        } else {
          this.productDetailSpinnerHidden = true;
          this.productDetailNotFoundHidden = false;
          this.productDetailSpinnerContentHidden = true;
        }

        let fi = this.productPhoto.nativeElement;
        if (fi.files && fi.files[0]) {
          let fileToUpload = fi.files[0];

          let buttonProductUpload: Element = document.getElementById("buttonProductUpload");
          buttonProductUpload.removeAttribute("disabled");
        }

        if (this.detailProductSubscription != null) this.detailProductSubscription.unsubscribe();
      }
    );
  }

  public inputFileChange(): void {
    let fi = this.productPhoto.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      let buttonProductUpload: Element = document.getElementById("buttonProductUpload");
      buttonProductUpload.removeAttribute("disabled");
    }
  }

  public buttonProductUploadClick(): void {
    let buttonProductUpload: Element = document.getElementById("buttonProductUpload");
    buttonProductUpload.setAttribute("disabled", "disabled");

    let fi = this.productPhoto.nativeElement;

    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];

      this.productService.uploadProductPhoto(fileToUpload);
      this.saveProductSubscription = this.productService.saveProductObservable.subscribe(
        data => {
          if (data[0] == "success") {

            let imageURL = data[1];
            this.detailProductModel.ImageURL = imageURL;

            this.snackBar.open('Photo upload successful', '', {
              duration: 3000,
              horizontalPosition: this.appSettings.snackBarHorizontalPosition,
              verticalPosition: this.appSettings.snackBarVerticalPosition,
              panelClass: ["green-snackbar"]
            });
          } else if (data[0] == "failed") {
            this.snackBar.open(data[1], '', {
              duration: 3000,
              horizontalPosition: this.appSettings.snackBarHorizontalPosition,
              verticalPosition: this.appSettings.snackBarVerticalPosition,
              panelClass: ["orange-snackbar"]
            });
          }

          buttonProductUpload.removeAttribute("disabled");
          if (this.saveProductSubscription != null) this.saveProductSubscription.unsubscribe();
        }
      );
    }
  }

  public buttonProductDetailDialogSaveClick(): void {
    let buttonProductUpload: Element = document.getElementById("buttonProductUpload");
    let buttonProductDetailDialogSave: Element = document.getElementById("buttonProductDetailDialogSave");
    let buttonProductDetailDialogClose: Element = document.getElementById("buttonProductDetailDialogClose");

    buttonProductUpload.setAttribute("disabled", "disabled");
    buttonProductDetailDialogSave.setAttribute("disabled", "disabled");
    buttonProductDetailDialogClose.setAttribute("disabled", "disabled");

    let modelrrorMessage = "";
    let isValid = false;

    if (this.detailProductModel.ProductManualCode === "") {
      modelrrorMessage = "Product Manual Code is required.";
    } else if (this.detailProductModel.ProductSKUCode === "") {
      modelrrorMessage = "Product SKU Code required.";
    } else if (this.detailProductModel.ProductDescription === "") {
      modelrrorMessage = "Product Description is required.";
    } else if (this.detailProductModel.Particulars === "") {
      modelrrorMessage = "Particulars is required.";
    } else if (this.detailProductModel.Status === "") {
      modelrrorMessage = "Status is required.";
    } else {
      isValid = true;
    }

    if (isValid == false) {
      this.snackBar.open(modelrrorMessage, '', {
        duration: 3000,
        horizontalPosition: this.appSettings.snackBarHorizontalPosition,
        verticalPosition: this.appSettings.snackBarVerticalPosition,
        panelClass: ["orange-snackbar"]
      });

      buttonProductUpload.removeAttribute("disabled");
      buttonProductDetailDialogSave.removeAttribute("disabled");
      buttonProductDetailDialogClose.removeAttribute("disabled");
    } else {
      this.productService.saveProduct(this.detailProductModel);
      this.saveProductSubscription = this.productService.saveProductObservable.subscribe(
        data => {
          if (data[0] == "success") {
            this.snackBar.open(data[1], '', {
              duration: 3000,
              horizontalPosition: this.appSettings.snackBarHorizontalPosition,
              verticalPosition: this.appSettings.snackBarVerticalPosition,
              panelClass: ["green-snackbar"]
            });

            this.productDetailDialogComponent.close(200);
          } else if (data[0] == "failed") {
            this.snackBar.open(data[1], '', {
              duration: 3000,
              horizontalPosition: this.appSettings.snackBarHorizontalPosition,
              verticalPosition: this.appSettings.snackBarVerticalPosition,
              panelClass: ["orange-snackbar"]
            });

            buttonProductUpload.removeAttribute("disabled");
            buttonProductDetailDialogSave.removeAttribute("disabled");
            buttonProductDetailDialogClose.removeAttribute("disabled");
          }

          if (this.saveProductSubscription != null) this.saveProductSubscription.unsubscribe();
        }
      );
    }
  }

  public buttonProductDetailDialogCloseClick(): void {
    this.productDetailDialogComponent.close();

    if (this.detailProductSubscription != null) this.detailProductSubscription.unsubscribe();
    if (this.saveProductSubscription != null) this.saveProductSubscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.productDetailDialogData.productData != null) {
      this.detailProduct(this.productDetailDialogData.productData.Id);
    } else {
      this.detailProductModel = {
        Id: 0,
        ProductCode: "0000000000",
        ProductManualCode: "",
        ProductSKUCode: "",
        ProductDescription: "",
        Particulars: "",
        ImageURL: "",
        Price: 0,
        SellerUserName: localStorage.getItem('username'),
        SellerFullName: localStorage.getItem('full_name'),
        Status: "",
      };

      this.productDetailSpinnerHidden = true;
      this.productDetailNotFoundHidden = true;
      this.productDetailSpinnerContentHidden = false;
    }
  }

  ngOnDestroy() {
    if (this.detailProductSubscription != null) this.detailProductSubscription.unsubscribe();
    if (this.saveProductSubscription != null) this.saveProductSubscription.unsubscribe();
  }
}
