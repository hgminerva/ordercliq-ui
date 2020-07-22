import { Injectable } from '@angular/core';
import { AppSettings } from './../../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ConfirmOrderModel } from './confirm-order-model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmOrderService {

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

  public detailConfirmOrderSubject = new Subject<ConfirmOrderModel>();
  public detailConfirmOrderObservable = this.detailConfirmOrderSubject.asObservable();

  public detaiConfirmOrder(id: number): void {
    let confirmOrderModel: ConfirmOrderModel = null;

    this.httpClient.get(this.defaultAPIURLHost + "/api/TrnOrder/detail/confirmOrder/" + id, this.options).subscribe(
      response => {
        let results = response;

        if (results != null) {
          confirmOrderModel = {
            Id: results["id"],
            OrderNumber: results["orderNumber"],
            ProductCode: results["productCode"],
            OrderDate: new Date(results["orderDate"]).toLocaleDateString("fr-CA"),
            ProductManualCode: results["productManualCode"],
            ProductDescription: results["productDescription"],
            Remarks: results["remarks"],
            ProductPrice: results["productPrice"],
            Quantity: results["quantity"],
            Amount: results["amount"],
            SellerUserName: results["sellerUserName"],
            SellerFullName: results["sellerFullName"],
            BuyerUserName: results["buyerUserName"],
            BuyerFullName: results["buyerFullName"],
            BuyerAddress: results["buyerAddress"],
            BuyerContactNumber: results["buyerContactNumber"],
            Status: results["status"]
          }
        }

        this.detailConfirmOrderSubject.next(confirmOrderModel);
      },
      error => {
        this.detailConfirmOrderSubject.next(null);
      }
    );
  }
}
