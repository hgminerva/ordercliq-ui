import { Injectable } from '@angular/core';
import { AppSettings } from './../../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { CreateOrderProductModel } from './create-order-product-model';
import { CreateOrderLoginUserModel } from './create-order-login-user-model';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    })
  };

  public createOrderSubject = new Subject<string[]>();
  public createOrderObservable = this.createOrderSubject.asObservable();
  public loginUsertSubject = new Subject<CreateOrderLoginUserModel>();
  public loginUserObservable = this.loginUsertSubject.asObservable();
  public detailProductSubject = new Subject<CreateOrderProductModel>();
  public detailProductObservable = this.detailProductSubject.asObservable();

  public createOrder(productId: number, orderObjects: any): void {
    let orderData = {
      OrderNumber: "0000000000",
      OrderDate: new Date(),
      ProductCode: "0000000000",
      ProductManualCode: "0000000000",
      ProductSKUCode: "0000000000",
      ProductDescription: "NA",
      Remarks: orderObjects.Remarks,
      ProductPrice: 0,
      Quantity: orderObjects.Quantity,
      Amount: 0,
      SellerUserName: "NA",
      SellerFullName: "NA",
      BuyerUserName: "NA",
      BuyerFullName: "NA",
      BuyerAddress: orderObjects.BuyerAddress,
      BuyerContactNumber: orderObjects.BuyerContactNumber,
      Status: "Open",
    };

    this.httpClient.post(this.defaultAPIURLHost + "/api/TrnOrder/createOrder/" + productId, JSON.stringify(orderData), this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", response["id"]];
        this.createOrderSubject.next(responseResults);
      },
      error => {
        let errorMessage = "";

        console.log(error);

        if (error.error != null) {
          if (error.error.errors != null) {
            for (var errorField in error.error.errors) {
              if (errorField != null) {
                for (let i = 0; i < error.error.errors[errorField].length; i++) {
                  errorMessage = error.error.errors[errorField][i];
                  break;
                }
              }
            }
          } else {
            errorMessage = error["error"];
          }
        } else {
          errorMessage = error["error"];
        }

        if (error.status === 401) {
          errorMessage = "Unauthorized"
        }

        let errorResults: string[] = ["failed", errorMessage];
        this.createOrderSubject.next(errorResults);
      }
    );
  }

  public loginUser(): void {
    let loginUserModel: CreateOrderLoginUserModel = null;

    this.httpClient.get(this.defaultAPIURLHost + "/api/MstUser/loginUser", this.options).subscribe(
      response => {
        let results = response;

        if (results != null) {
          loginUserModel = {
            Id: results["id"],
            UserType: results["userType"],
            UserName: results["userName"],
            Password: results["password"],
            FullName: results["fullName"],
            Address: results["address"],
            ContactNumber: results["contactNumber"],
            EmailAddress: results["emailAddress"],
            Status: results["status"]
          }
        }

        this.loginUsertSubject.next(loginUserModel);
      },
      error => {
        this.loginUsertSubject.next(null);
      }
    );
  }

  public detaiProduct(id: number): void {
    let productModel: CreateOrderProductModel = null;

    this.httpClient.get(this.defaultAPIURLHost + "/api/MstProduct/detail/" + id, this.options).subscribe(
      response => {
        let results = response;

        if (results != null) {
          productModel = {
            Id: results["id"],
            ProductCode: results["productCode"],
            ProductManualCode: results["productManualCode"],
            ProductSKUCode: results["productSKUCode"],
            ProductDescription: results["productDescription"],
            Particulars: results["particulars"],
            ImageURL: results["imageURL"],
            Price: results["price"],
            SellerUserName: results["sellerUserName"],
            SellerFullName: results["sellerFullName"],
            Status: results["status"]
          }
        }

        this.detailProductSubject.next(productModel);
      },
      error => {
        this.detailProductSubject.next(null);
      }
    );
  }
}
