import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { ConfirmOrderService } from './confirm-order.service';

import { ConfirmOrderModel } from './confirm-order-model';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public confirmOrderService: ConfirmOrderService
  ) { }

  public confirmOrderDetailSubscription: any;
  public confirmOrderModel: ConfirmOrderModel = {
    Id: 0,
    OrderNumber: "",
    OrderDate: "",
    ProductCode: "",
    ProductManualCode: "",
    ProductDescription: "",
    Remarks: "",
    ProductPrice: 0,
    Quantity: 0,
    Amount: 0,
    SellerUserName: "",
    SellerFullName: "",
    BuyerUserName: "",
    BuyerFullName: "",
    BuyerAddress: "",
    BuyerContactNumber: "",
    Status: "",
  };

  public confirmOrderSpinnerHidden: boolean = false;
  public confirmOrderSpinnerContentHidden: boolean = true;

  public confirmOrderDetail(): void {
    let id: number = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.confirmOrderService.detaiConfirmOrder(id);
    this.confirmOrderDetailSubscription = this.confirmOrderService.detailConfirmOrderObservable.subscribe(
      data => {
        if (data != null) {
          this.confirmOrderModel = {
            Id: data.Id,
            OrderNumber: data.OrderNumber,
            OrderDate: data.OrderDate,
            ProductCode: data.ProductCode,
            ProductManualCode: data.ProductManualCode,
            ProductDescription: data.ProductDescription,
            Remarks: data.Remarks,
            ProductPrice: data.ProductPrice,
            Quantity: data.Quantity,
            Amount: data.Amount,
            SellerUserName: data.SellerUserName,
            SellerFullName: data.SellerFullName,
            BuyerUserName: data.BuyerUserName,
            BuyerFullName: data.BuyerFullName,
            BuyerAddress: data.BuyerAddress,
            BuyerContactNumber: data.BuyerContactNumber,
            Status: data.Status
          };
        }
          
        this.confirmOrderSpinnerHidden = true;
        this.confirmOrderSpinnerContentHidden = false;

        if (this.confirmOrderDetailSubscription != null) this.confirmOrderDetailSubscription.unsubscribe();
      }
    );
  }


  ngOnInit(): void {
    this.confirmOrderDetail();
  }

  ngOnDestroy() {
    if (this.confirmOrderDetailSubscription != null) this.confirmOrderDetailSubscription.unsubscribe();
  }
}
