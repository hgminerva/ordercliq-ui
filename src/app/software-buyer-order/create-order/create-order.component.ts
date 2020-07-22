import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CreateOrderService } from './create-order.service';
import { CreateOrderProductModel } from './create-order-product-model';
import { CreateOrderLoginUserModel } from './create-order-login-user-model';

import { AppSettings } from './../../app-settings';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public createOrderService: CreateOrderService,
    public appSettings: AppSettings,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: any
  ) {

  }

  public price: string = "0.00";
  public quantity: number = 1;
  public amount: string = "0.00";

  public loginUserDetailSubscription: any;
  public loginUserModel: CreateOrderLoginUserModel = {
    Id: 0,
    UserType: "",
    UserName: "",
    Password: "",
    FullName: "",
    Address: "",
    ContactNumber: "",
    EmailAddress: "",
    Status: ""
  };

  public productDetailSubscription: any;
  public createOrderProductModel: CreateOrderProductModel = {
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

  public createOrderSpinnerHidden: boolean = false;
  public productNotFoundHidden: boolean = true;
  public createOrderSpinnerContentHidden: boolean = true;

  public placeOrderSubscription: any;
  public placeOrderRemarks: string = "";

  public orderSpinnerStatus: string = "Please wait...";

  public orderFormGroup: FormGroup;
  public addressFormGroup: FormGroup;
  public confirmFormGroup: FormGroup;

  public isOrderFormGroupEditable: boolean = true;
  public isAddressFormGroupEditable: boolean = true;
  public isConfirmFormGroupEditable: boolean = true;

  public buttonAddQuantityClick(): void {
    this.quantity += 1;

    this.computeAmount();
  }

  public buttonMinusQuantityClick(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }

    this.computeAmount();
  }

  public computeAmount(): void {
    this.amount = (Math.round(this.createOrderProductModel.Price * this.quantity * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  public getLoginUserDetail(): void {
    this.createOrderService.loginUser();
    this.loginUserDetailSubscription = this.createOrderService.loginUserObservable.subscribe(
      data => {
        if (data != null) {
          this.loginUserModel = {
            Id: data.Id,
            UserType: data.UserType,
            UserName: data.UserName,
            Password: data.Password,
            FullName: data.FullName,
            Address: data.Address,
            ContactNumber: data.ContactNumber,
            EmailAddress: data.EmailAddress,
            Status: data.Status
          };
        }

        if (this.loginUserDetailSubscription != null) this.loginUserDetailSubscription.unsubscribe();
      }
    );
  }

  public getProductDetail(): void {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');

    this.createOrderService.detaiProduct(parseInt(productId));
    this.productDetailSubscription = this.createOrderService.detailProductObservable.subscribe(
      data => {
        if (data != null) {
          this.createOrderProductModel = {
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
            Status: data.Status
          };

          this.price = (Math.round(data.Price * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.amount = this.price;

          this.titleService.setTitle(data.ProductDescription);
          this.metaService.updateTag({ property: 'og:title', content: data.ProductDescription });
          this.metaService.updateTag({ property: 'og:description', content: data.Particulars });
          this.metaService.updateTag({ property: 'og:url', content: 'https://www.orderfolder.com/software-buyer-order/create-order/' + productId });
          this.metaService.updateTag({ property: 'og:image', content: data.ImageURL });

          this.createOrderSpinnerHidden = true;
          this.createOrderSpinnerContentHidden = false;

          this.getLoginUserDetail();
        } else {
          this.createOrderSpinnerHidden = true;
          this.productNotFoundHidden = false;
        }

        if (this.productDetailSubscription != null) this.productDetailSubscription.unsubscribe();
      }
    );
  }

  public buttonPlaceOrderClick(): void {
    let productId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('productId'));

    let buttonPlaceOrder: Element = document.getElementById("buttonPlaceOrder");
    buttonPlaceOrder.setAttribute("disabled", "disabled");

    let orderData = {
      Remarks: this.placeOrderRemarks,
      Quantity: this.quantity,
      BuyerAddress: this.loginUserModel.Address,
      BuyerContactNumber: this.loginUserModel.ContactNumber
    };

    this.createOrderSpinnerHidden = false;
    this.createOrderSpinnerContentHidden = true;

    this.orderSpinnerStatus = "Placing your order to the seller...";

    this.createOrderService.createOrder(productId, orderData);
    this.placeOrderSubscription = this.createOrderService.createOrderObservable.subscribe(
      data => {
        if (data[0] == "success") {
          let id = data[1];

          setTimeout(() => {
            this.router.navigate(['/software-buyer-order/confirm-order/' + id]);
          }, 500);
        } else if (data[0] == "failed") {
          if (data[1] === "Unauthorized") {

            window.location.href = "/account/login/" + productId;

            // setTimeout(() => {
            //   this.router.navigate(['/account/login/' + productId]);
            // }, 500);
          } else {
            this.createOrderSpinnerHidden = true;
            this.createOrderSpinnerContentHidden = false;
            buttonPlaceOrder.removeAttribute("disabled");

            this.snackBar.open(data[1], '', {
              duration: 3000,
              horizontalPosition: this.appSettings.snackBarHorizontalPosition,
              verticalPosition: this.appSettings.snackBarVerticalPosition,
              panelClass: ["orange-snackbar"]
            });
          }
        }

        if (this.placeOrderSubscription != null) this.placeOrderSubscription.unsubscribe();
      }
    );
  }

  ngOnInit(): void {
    this.getProductDetail();
  }

  ngOnDestroy() {
    if (this.productDetailSubscription != null) this.productDetailSubscription.unsubscribe();
    if (this.loginUserDetailSubscription != null) this.loginUserDetailSubscription.unsubscribe();
    if (this.placeOrderSubscription != null) this.placeOrderSubscription.unsubscribe();
  }

}
