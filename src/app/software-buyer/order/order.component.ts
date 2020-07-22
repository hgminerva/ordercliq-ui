import { Component, OnInit, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { OrderCancelDialogComponent } from './order-cancel-dialog/order-cancel-dialog.component'

import { OpenOrderDataInterface } from './order-data-interface/open-order-data-interface';
import { VerifiedOrderDataInterface } from './order-data-interface/verified-order-data-interface';
import { CompletedOrderDataInterface } from './order-data-interface/completed-order-data-interface';
import { CancelledOrderDataInterface } from './order-data-interface/cancelled-order-data-interface';

import { OrderService } from "./order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private orderDetailDialog: MatDialog,
    private orderCancelDialog: MatDialog
  ) { }

  public openOrderDisplayedColumns: string[] = [
    'ButtonView',
    'OrderNumber',
    'OrderDate',
    'ProductDescription',
    'ProductPrice',
    'Quantity',
    'Amount',
    'SellerFullName',
    'ButtonCancel'
  ];
  public openOrderDataSource: MatTableDataSource<OpenOrderDataInterface>;

  @ViewChild('openOrderPaginator') public openOrderPaginator: MatPaginator;
  @ViewChild('openOrderSort') public openOrderSort: MatSort;

  public openOrderStartDateFilterFormControl = new FormControl(new Date());
  public openOrderEndDateFilterFormControl = new FormControl(new Date());

  public listOpenOrderSubscription: any;
  public openOrderData: OpenOrderDataInterface[] = []

  public openOrderSpinnerHidden: boolean = false;
  public openOrderSpinnerContentHidden: boolean = true;

  public verifiedOrderDisplayedColumns: string[] = [
    'ButtonView',
    'OrderNumber',
    'OrderDate',
    'ProductDescription',
    'ProductPrice',
    'Quantity',
    'Amount',
    'SellerFullName'
  ];
  public verifiedOrderDataSource: MatTableDataSource<VerifiedOrderDataInterface>;

  @ViewChild('verifiedOrderPaginator') public verifiedOrderPaginator: MatPaginator;
  @ViewChild('verifiedOrderSort') public verifiedOrderSort: MatSort;

  public verifiedOrderStartDateFilterFormControl = new FormControl(new Date());
  public verifiedOrderEndDateFilterFormControl = new FormControl(new Date());

  public listVerifiedOrderSubscription: any;
  public verifiedOrderData: VerifiedOrderDataInterface[] = []

  public verifiedOrderSpinnerHidden: boolean = false;
  public verifiedOrderSpinnerContentHidden: boolean = true;

  public completedOrderDisplayedColumns: string[] = [
    'ButtonView',
    'OrderNumber',
    'OrderDate',
    'ProductDescription',
    'ProductPrice',
    'Quantity',
    'Amount',
    'SellerFullName'
  ];
  public completedOrderDataSource: MatTableDataSource<CompletedOrderDataInterface>;

  @ViewChild('completedOrderPaginator') public completedOrderPaginator: MatPaginator;
  @ViewChild('completedOrderSort') public completedOrderSort: MatSort;

  public completedOrderStartDateFilterFormControl = new FormControl(new Date());
  public completedOrderEndDateFilterFormControl = new FormControl(new Date());

  public listCompletedOrderSubscription: any;
  public completedOrderData: CompletedOrderDataInterface[] = []

  public completedOrderSpinnerHidden: boolean = false;
  public completedOrderSpinnerContentHidden: boolean = true;

  public cancelledOrderDisplayedColumns: string[] = [
    'ButtonView',
    'OrderNumber',
    'OrderDate',
    'ProductDescription',
    'ProductPrice',
    'Quantity',
    'Amount',
    'SellerFullName'
  ];
  public cancelledOrderDataSource: MatTableDataSource<CancelledOrderDataInterface>;

  @ViewChild('cancelledOrderPaginator') public cancelledOrderPaginator: MatPaginator;
  @ViewChild('cancelledOrderSort') public cancelledOrderSort: MatSort;

  public cancelledOrderStartDateFilterFormControl = new FormControl(new Date());
  public cancelledOrderEndDateFilterFormControl = new FormControl(new Date());

  public listCancelledOrderSubscription: any;
  public cancelledOrderData: CancelledOrderDataInterface[] = []

  public cancelledOrderSpinnerHidden: boolean = false;
  public cancelledOrderSpinnerContentHidden: boolean = true;

  public listOpenOrder() {
    let openOrderStartDateFilter: string = new Date(this.openOrderStartDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let openOrderEndDateFilter: string = new Date(this.openOrderEndDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.openOrderData = [];
    this.openOrderDataSource = new MatTableDataSource(this.openOrderData);
    this.openOrderDataSource.paginator = this.openOrderPaginator;
    this.openOrderDataSource.sort = this.openOrderSort;

    this.openOrderSpinnerHidden = false;
    this.openOrderSpinnerContentHidden = true;

    this.orderService.listOpenOrderData(openOrderStartDateFilter, openOrderEndDateFilter);
    this.listOpenOrderSubscription = this.orderService.listOpenOrderObservable.subscribe(
      data => {
        this.openOrderSpinnerHidden = true;
        this.openOrderSpinnerContentHidden = false;

        if (data.length > 0) {
          this.openOrderData = data;
          this.openOrderDataSource = new MatTableDataSource(this.openOrderData);
          this.openOrderDataSource.paginator = this.openOrderPaginator;
          this.openOrderDataSource.sort = this.openOrderSort;
        }

        if (this.listOpenOrderSubscription != null) this.listOpenOrderSubscription.unsubscribe();
      }
    );
  }

  public openOrderDateFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.listOpenOrder();
  }

  public applyOpenOrderFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.openOrderDataSource.filter = filterValue.trim().toLowerCase();

    if (this.openOrderDataSource.paginator) {
      this.openOrderDataSource.paginator.firstPage();
    }
  }

  public buttonPreviewOpenOrderClick(openOrder: OpenOrderDataInterface): void {
    const openOrderDetailDialog = this.orderDetailDialog.open(OrderDetailDialogComponent, {
      width: '600px',
      data: {
        status: "Open",
        orderData: openOrder
      },
      disableClose: true
    });

    openOrderDetailDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.listOpenOrder();
        this.listCancelledOrder();
      }
    });
  }

  public buttonCancelOpenOrderClick(openOrder: OpenOrderDataInterface): void {
    const openOrderCancelDialog = this.orderCancelDialog.open(OrderCancelDialogComponent, {
      width: '300px',
      data: {
        content: "Cancel order no. " + openOrder.OrderNumber + "?",
        orderData: openOrder
      },
      disableClose: true
    });

    openOrderCancelDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.listOpenOrder();
        this.listCancelledOrder();
      }
    });
  }

  public listVerifiedOrder() {
    let verifiedOrderStartDateFilter: string = new Date(this.verifiedOrderStartDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let verifiedOrderEndDateFilter: string = new Date(this.verifiedOrderEndDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.verifiedOrderData = [];
    this.verifiedOrderDataSource = new MatTableDataSource(this.verifiedOrderData);
    this.verifiedOrderDataSource.paginator = this.verifiedOrderPaginator;
    this.verifiedOrderDataSource.sort = this.verifiedOrderSort;

    this.verifiedOrderSpinnerHidden = false;
    this.verifiedOrderSpinnerContentHidden = true;

    this.orderService.listVerifiedOrderData(verifiedOrderStartDateFilter, verifiedOrderEndDateFilter);
    this.listVerifiedOrderSubscription = this.orderService.listVerifiedOrderObservable.subscribe(
      data => {
        this.verifiedOrderSpinnerHidden = true;
        this.verifiedOrderSpinnerContentHidden = false;

        if (data.length > 0) {
          this.verifiedOrderData = data;
          this.verifiedOrderDataSource = new MatTableDataSource(this.verifiedOrderData);
          this.verifiedOrderDataSource.paginator = this.verifiedOrderPaginator;
          this.verifiedOrderDataSource.sort = this.verifiedOrderSort;
        }

        if (this.listVerifiedOrderSubscription != null) this.listVerifiedOrderSubscription.unsubscribe();
      }
    );
  }

  public verifiedOrderDateFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.listVerifiedOrder();
  }

  public applyVerifiedOrderFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.verifiedOrderDataSource.filter = filterValue.trim().toLowerCase();

    if (this.verifiedOrderDataSource.paginator) {
      this.verifiedOrderDataSource.paginator.firstPage();
    }
  }

  public buttonPreviewVerifiedOrderClick(verifiedOrder: VerifiedOrderDataInterface): void {
    const openOrderDetailDialog = this.orderDetailDialog.open(OrderDetailDialogComponent, {
      width: '600px',
      data: {
        status: "Verified",
        orderData: verifiedOrder
      },
      disableClose: true
    });

    openOrderDetailDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.listVerifiedOrder();
        this.listCancelledOrder();
      }
    });
  }

  public listCompletedOrder() {
    let completedOrderStartDateFilter: string = new Date(this.completedOrderStartDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let completedOrderEndDateFilter: string = new Date(this.completedOrderEndDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.completedOrderData = [];
    this.completedOrderDataSource = new MatTableDataSource(this.completedOrderData);
    this.completedOrderDataSource.paginator = this.completedOrderPaginator;
    this.completedOrderDataSource.sort = this.completedOrderSort;

    this.completedOrderSpinnerHidden = false;
    this.completedOrderSpinnerContentHidden = true;

    this.orderService.listCompletedOrderData(completedOrderStartDateFilter, completedOrderEndDateFilter);
    this.listCompletedOrderSubscription = this.orderService.listCompletedOrderObservable.subscribe(
      data => {
        this.completedOrderSpinnerHidden = true;
        this.completedOrderSpinnerContentHidden = false;

        if (data.length > 0) {
          this.completedOrderData = data;
          this.completedOrderDataSource = new MatTableDataSource(this.completedOrderData);
          this.completedOrderDataSource.paginator = this.completedOrderPaginator;
          this.completedOrderDataSource.sort = this.completedOrderSort;
        }

        if (this.listCompletedOrderSubscription != null) this.listCompletedOrderSubscription.unsubscribe();
      }
    );
  }

  public completedOrderDateFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.listCompletedOrder();
  }

  public applyCompletedOrderFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.completedOrderDataSource.filter = filterValue.trim().toLowerCase();

    if (this.completedOrderDataSource.paginator) {
      this.completedOrderDataSource.paginator.firstPage();
    }
  }

  public buttonPreviewCompletedOrderClick(completedOrder: CompletedOrderDataInterface): void {
    const openOrderDetailDialog = this.orderDetailDialog.open(OrderDetailDialogComponent, {
      width: '600px',
      data: {
        status: "Completed",
        orderData: completedOrder
      },
      disableClose: true
    });

    openOrderDetailDialog.afterClosed().subscribe(result => {
      if (result == 200) {

      }
    });
  }

  public listCancelledOrder() {
    let cancelledOrderStartDateFilter: string = new Date(this.cancelledOrderStartDateFilterFormControl.value).toLocaleDateString("fr-CA");
    let cancelledOrderEndDateFilter: string = new Date(this.cancelledOrderEndDateFilterFormControl.value).toLocaleDateString("fr-CA");

    this.cancelledOrderData = [];
    this.cancelledOrderDataSource = new MatTableDataSource(this.cancelledOrderData);
    this.cancelledOrderDataSource.paginator = this.cancelledOrderPaginator;
    this.cancelledOrderDataSource.sort = this.cancelledOrderSort;

    this.cancelledOrderSpinnerHidden = false;
    this.cancelledOrderSpinnerContentHidden = true;

    this.orderService.listCancelledOrderData(cancelledOrderStartDateFilter, cancelledOrderEndDateFilter);
    this.listCancelledOrderSubscription = this.orderService.listCancelledOrderObservable.subscribe(
      data => {
        this.cancelledOrderSpinnerHidden = true;
        this.cancelledOrderSpinnerContentHidden = false;

        if (data.length > 0) {
          this.cancelledOrderData = data;
          this.cancelledOrderDataSource = new MatTableDataSource(this.cancelledOrderData);
          this.cancelledOrderDataSource.paginator = this.cancelledOrderPaginator;
          this.cancelledOrderDataSource.sort = this.cancelledOrderSort;
        }

        if (this.listCancelledOrderSubscription != null) this.listCancelledOrderSubscription.unsubscribe();
      }
    );
  }

  public cancelledOrderDateFiltersDateChange(type: string, event: MatDatepickerInputEvent<Date>): void {
    this.listCancelledOrder();
  }

  public applyCancelledOrderFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.cancelledOrderDataSource.filter = filterValue.trim().toLowerCase();

    if (this.cancelledOrderDataSource.paginator) {
      this.cancelledOrderDataSource.paginator.firstPage();
    }
  }

  public buttonPreviewCancelledOrderClick(cancelledOrder: CancelledOrderDataInterface): void {
    const openOrderDetailDialog = this.orderDetailDialog.open(OrderDetailDialogComponent, {
      width: '600px',
      data: {
        status: "Cancelled",
        orderData: cancelledOrder
      },
      disableClose: true
    });

    openOrderDetailDialog.afterClosed().subscribe(result => {
      if (result == 200) {

      }
    });
  }

  ngOnInit() {
    this.listOpenOrder();
    this.listVerifiedOrder();
    this.listCompletedOrder();
    this.listCancelledOrder();
  }

  ngOnDestroy() {
    if (this.listOpenOrderSubscription != null) this.listOpenOrderSubscription.unsubscribe();
    if (this.listVerifiedOrderSubscription != null) this.listVerifiedOrderSubscription.unsubscribe();
    if (this.listCompletedOrderSubscription != null) this.listCompletedOrderSubscription.unsubscribe();
    if (this.listCancelledOrderSubscription != null) this.listCancelledOrderSubscription.unsubscribe();
  }

}