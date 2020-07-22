import { Injectable } from '@angular/core';
import { AppSettings } from './../../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { OpenOrderDataInterface } from './order-data-interface/open-order-data-interface';
import { VerifiedOrderDataInterface } from './order-data-interface/verified-order-data-interface';
import { CompletedOrderDataInterface } from './order-data-interface/completed-order-data-interface';
import { CancelledOrderDataInterface } from './order-data-interface/cancelled-order-data-interface';

import { OrderDetailModel } from './order-detail-dialog/order-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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

  public listOpenOrderSubject = new Subject<OpenOrderDataInterface[]>();
  public listOpenOrderObservable = this.listOpenOrderSubject.asObservable();
  public listVerifiedOrderSubject = new Subject<VerifiedOrderDataInterface[]>();
  public listVerifiedOrderObservable = this.listVerifiedOrderSubject.asObservable();
  public listCompletedOrderSubject = new Subject<CompletedOrderDataInterface[]>();
  public listCompletedOrderObservable = this.listCompletedOrderSubject.asObservable();
  public listCancelledOrderSubject = new Subject<CancelledOrderDataInterface[]>();
  public listCancelledOrderObservable = this.listCancelledOrderSubject.asObservable();
  public verifyOrderSubject = new Subject<string[]>();
  public verifyOrderObservable = this.verifyOrderSubject.asObservable();
  public completeOrderSubject = new Subject<string[]>();
  public completeOrderObservable = this.completeOrderSubject.asObservable();
  public cancelOrderSubject = new Subject<string[]>();
  public cancelOrderObservable = this.cancelOrderSubject.asObservable();

  public orderDetailSubject = new Subject<OrderDetailModel>();
  public orderDetailObservable = this.orderDetailSubject.asObservable();

  public listOpenOrderData(startDate: string, endDate: string): void {
    let openOrderData: OpenOrderDataInterface[] = [];
    this.listOpenOrderSubject.next(openOrderData);

    this.httpClient.get(this.defaultAPIURLHost + "/api/TrnOrder/list/perSellerUser/" + startDate + "/" + endDate + "/Open", this.options).subscribe(
      response => {
        let results = response;

        if (results["length"] > 0) {
          for (let i = 0; i <= results["length"] - 1; i++) {
            openOrderData.push({
              ButtonView: "View",
              Id: results[i].id,
              OrderNumber: results[i].orderNumber,
              OrderDate: new Date(results[i].orderDate).toLocaleDateString("fr-CA"),
              ProductDescription: results[i].productDescription,
              ProductPrice: (Math.round(results[i].productPrice * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              Quantity: results[i].quantity,
              Amount: (Math.round(results[i].amount * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              BuyerFullName: results[i].buyerFullName,
              ButtonVerify: "Verify",
              ButtonCancel: "Cancel"
            });
          }
        }

        this.listOpenOrderSubject.next(openOrderData);
      },
      error => {
        this.listOpenOrderSubject.next(openOrderData);
      }
    );
  }

  public listVerifiedOrderData(startDate: string, endDate: string): void {
    let verifiedOrderData: VerifiedOrderDataInterface[] = [];
    this.listVerifiedOrderSubject.next(verifiedOrderData);

    this.httpClient.get(this.defaultAPIURLHost + "/api/TrnOrder/list/perSellerUser/" + startDate + "/" + endDate + "/Verified", this.options).subscribe(
      response => {
        let results = response;

        if (results["length"] > 0) {
          for (let i = 0; i <= results["length"] - 1; i++) {
            verifiedOrderData.push({
              ButtonView: "View",
              Id: results[i].id,
              OrderNumber: results[i].orderNumber,
              OrderDate: new Date(results[i].orderDate).toLocaleDateString("fr-CA"),
              ProductDescription: results[i].productDescription,
              ProductPrice: (Math.round(results[i].productPrice * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              Quantity: results[i].quantity,
              Amount: (Math.round(results[i].amount * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              BuyerFullName: results[i].buyerFullName,
              ButtonComplete: "Complete",
              ButtonCancel: "Cancel"
            });
          }
        }

        this.listVerifiedOrderSubject.next(verifiedOrderData);
      },
      error => {
        this.listVerifiedOrderSubject.next(verifiedOrderData);
      }
    );
  }

  public listCompletedOrderData(startDate: string, endDate: string): void {
    let completedOrderData: CompletedOrderDataInterface[] = [];
    this.listCompletedOrderSubject.next(completedOrderData);

    this.httpClient.get(this.defaultAPIURLHost + "/api/TrnOrder/list/perSellerUser/" + startDate + "/" + endDate + "/Completed", this.options).subscribe(
      response => {
        let results = response;

        if (results["length"] > 0) {
          for (let i = 0; i <= results["length"] - 1; i++) {
            completedOrderData.push({
              ButtonView: "View",
              Id: results[i].id,
              OrderNumber: results[i].orderNumber,
              OrderDate: new Date(results[i].orderDate).toLocaleDateString("fr-CA"),
              ProductDescription: results[i].productDescription,
              ProductPrice: (Math.round(results[i].productPrice * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              Quantity: results[i].quantity,
              Amount: (Math.round(results[i].amount * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              BuyerFullName: results[i].buyerFullName
            });
          }
        }

        this.listCompletedOrderSubject.next(completedOrderData);
      },
      error => {
        this.listCompletedOrderSubject.next(completedOrderData);
      }
    );
  }

  public listCancelledOrderData(startDate: string, endDate: string): void {
    let cancelledOrderData: CancelledOrderDataInterface[] = [];
    this.listCancelledOrderSubject.next(cancelledOrderData);

    this.httpClient.get(this.defaultAPIURLHost + "/api/TrnOrder/list/perSellerUser/" + startDate + "/" + endDate + "/Cancelled", this.options).subscribe(
      response => {
        let results = response;

        if (results["length"] > 0) {
          for (let i = 0; i <= results["length"] - 1; i++) {
            cancelledOrderData.push({
              ButtonView: "View",
              Id: results[i].id,
              OrderNumber: results[i].orderNumber,
              OrderDate: new Date(results[i].orderDate).toLocaleDateString("fr-CA"),
              ProductDescription: results[i].productDescription,
              ProductPrice: (Math.round(results[i].productPrice * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              Quantity: results[i].quantity,
              Amount: (Math.round(results[i].amount * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              BuyerFullName: results[i].buyerFullName
            });
          }
        }

        this.listCancelledOrderSubject.next(cancelledOrderData);
      },
      error => {
        this.listCancelledOrderSubject.next(cancelledOrderData);
      }
    );
  }

  public verifyOrder(id: number): void {
    this.httpClient.put(this.defaultAPIURLHost + "/api/TrnOrder/verify/" + id, "", this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.verifyOrderSubject.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.verifyOrderSubject.next(errorResults);
      }
    );
  }

  public completeOrder(id: number): void {
    this.httpClient.put(this.defaultAPIURLHost + "/api/TrnOrder/complete/" + id, "", this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.completeOrderSubject.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.completeOrderSubject.next(errorResults);
      }
    );
  }

  public cancelOrder(id: number): void {
    this.httpClient.put(this.defaultAPIURLHost + "/api/TrnOrder/cancel/" + id, "", this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.cancelOrderSubject.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.cancelOrderSubject.next(errorResults);
      }
    );
  }

  public orderDetail(id: number): void {
    let orderDetailModel: OrderDetailModel = null;

    this.httpClient.get(this.defaultAPIURLHost + "/api/TrnOrder/detail/" + id, this.options).subscribe(
      response => {
        let results = response;

        if (results != null) {
          orderDetailModel = {
            Id: results["id"],
            OrderNumber: results["orderNumber"],
            OrderDate: new Date(results["orderDate"]).toLocaleDateString("fr-CA"),
            ProductCode: results["productCode"],
            ProductManualCode: results["productManualCode"],
            ProductSKUCode: results["productSKUCode"],
            ProductDescription: results["productDescription"],
            Remarks: results["remarks"],
            ProductPrice: "₱ " + (Math.round(results["productPrice"] * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            Quantity: results["quantity"],
            Amount: "₱ " + (Math.round(results["amount"] * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            SellerUserName: results["sellerUserName"],
            SellerFullName: results["sellerFullName"],
            BuyerUserName: results["buyerUserName"],
            BuyerFullName: results["buyerFullName"],
            BuyerAddress: results["buyerAddress"],
            BuyerContactNumber: results["buyerContactNumber"],
            Status: results["status"]
          }
        }

        this.orderDetailSubject.next(orderDetailModel);
      },
      error => {
        this.orderDetailSubject.next(null);
      }
    );
  }
}
