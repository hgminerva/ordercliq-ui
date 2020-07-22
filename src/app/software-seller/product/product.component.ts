import { Component, OnInit, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { ActiveProductDataInterface } from './product-data-interface/active-product-data-interface';
import { InActiveProductDataInterface } from './product-data-interface/inactive-product-data-interface';

import { ProductService } from './product.service';

import { ProductDetailDialogComponent } from './product-detail-dialog/product-detail-dialog.component';
import { ProductDeleteDialogComponent } from './product-delete-dialog/product-delete-dialog.component';
import { ProductCreateOrderLinkDialogComponent } from './product-create-order-link-dialog/product-create-order-link-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private productDetailDialog: MatDialog,
    private productDeleteDialog: MatDialog,
    private productCreateOrderLinkDialog: MatDialog,
  ) { }

  public activeProductDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'ProductCode',
    'ProductManualCode',
    'ProductSKUCode',
    'ProductDescription',
    'Price',
    'ButtonOrderLink'
  ];
  public activeProductDataSource: MatTableDataSource<ActiveProductDataInterface>;

  @ViewChild('activeProductPaginator') public activeProductPaginator: MatPaginator;
  @ViewChild('activeProductSort') public activeProductSort: MatSort;

  public listActiveProductSubscription: any;
  public activeProductData: ActiveProductDataInterface[] = []

  public activeProductSpinnerHidden: boolean = false;
  public activeProductSpinnerContentHidden: boolean = true;

  public inActiveProductDisplayedColumns: string[] = [
    'ButtonEdit',
    'ButtonDelete',
    'ProductCode',
    'ProductManualCode',
    'ProductSKUCode',
    'ProductDescription',
    'Price'
  ];
  public inActiveProductDataSource: MatTableDataSource<InActiveProductDataInterface>;

  @ViewChild('inActiveProductPaginator') public inActiveProductPaginator: MatPaginator;
  @ViewChild('inActiveProductSort') public inActiveProductSort: MatSort;

  public listInActiveProductSubscription: any;
  public inActiveProductData: InActiveProductDataInterface[] = []

  public inActiveProductSpinnerHidden: boolean = false;
  public inActiveProductSpinnerContentHidden: boolean = true;

  public listActiveProduct() {
    this.activeProductData = [];
    this.activeProductDataSource = new MatTableDataSource(this.activeProductData);
    this.activeProductDataSource.paginator = this.activeProductPaginator;
    this.activeProductDataSource.sort = this.activeProductSort;

    this.activeProductSpinnerHidden = false;
    this.activeProductSpinnerContentHidden = true;

    this.productService.listActiveProduct();
    this.listActiveProductSubscription = this.productService.listActiveProductObservable.subscribe(
      data => {
        this.activeProductSpinnerHidden = true;
        this.activeProductSpinnerContentHidden = false;

        if (data.length > 0) {
          this.activeProductData = data;
          this.activeProductDataSource = new MatTableDataSource(this.activeProductData);
          this.activeProductDataSource.paginator = this.activeProductPaginator;
          this.activeProductDataSource.sort = this.activeProductSort;
        }

        if (this.listActiveProductSubscription != null) this.listActiveProductSubscription.unsubscribe();
      }
    );
  }

  public applyActiveProductFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activeProductDataSource.filter = filterValue.trim().toLowerCase();

    if (this.activeProductDataSource.paginator) {
      this.activeProductDataSource.paginator.firstPage();
    }
  }

  public buttonEditActiveProductClick(activeProductData: ActiveProductDataInterface): void {
    const openActiveProductDetailDialog = this.productDetailDialog.open(ProductDetailDialogComponent, {
      width: '1000px',
      data: {
        title: "Edit Product",
        content: "",
        productData: activeProductData
      },
      disableClose: true
    });

    openActiveProductDetailDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.listActiveProduct();
        this.listInActiveProduct();
      }
    });
  }

  public buttonDeleteActiveProductClick(activeProductData: ActiveProductDataInterface): void {
    const openActiveProductDeleteDialog = this.productDeleteDialog.open(ProductDeleteDialogComponent, {
      width: '300px',
      data: {
        content: "Are you sure you want to delete this product " + activeProductData.ProductDescription + "?",
        productData: activeProductData
      },
      disableClose: true
    });

    openActiveProductDeleteDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.listActiveProduct();
      }
    });
  }

  public listInActiveProduct() {
    this.inActiveProductData = [];
    this.inActiveProductDataSource = new MatTableDataSource(this.inActiveProductData);
    this.inActiveProductDataSource.paginator = this.inActiveProductPaginator;
    this.inActiveProductDataSource.sort = this.inActiveProductSort;

    this.inActiveProductSpinnerHidden = false;
    this.inActiveProductSpinnerContentHidden = true;

    this.productService.listInActiveProduct();
    this.listInActiveProductSubscription = this.productService.listInActiveProductObservable.subscribe(
      data => {
        this.inActiveProductSpinnerHidden = true;
        this.inActiveProductSpinnerContentHidden = false;

        if (data.length > 0) {
          this.inActiveProductData = data;
          this.inActiveProductDataSource = new MatTableDataSource(this.inActiveProductData);
          this.inActiveProductDataSource.paginator = this.inActiveProductPaginator;
          this.inActiveProductDataSource.sort = this.inActiveProductSort;
        }

        if (this.listInActiveProductSubscription != null) this.listInActiveProductSubscription.unsubscribe();
      }
    );
  }

  public applyInActiveProductFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inActiveProductDataSource.filter = filterValue.trim().toLowerCase();

    if (this.inActiveProductDataSource.paginator) {
      this.inActiveProductDataSource.paginator.firstPage();
    }
  }

  public buttonEditInActiveProductClick(inActiveProductData: InActiveProductDataInterface): void {
    const openInActiveProductDetailDialog = this.productDetailDialog.open(ProductDetailDialogComponent, {
      width: '1000px',
      data: {
        title: "Edit Product",
        content: "",
        productData: inActiveProductData
      },
      disableClose: true
    });

    openInActiveProductDetailDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.listActiveProduct();
        this.listInActiveProduct();
      }
    });
  }

  public buttonDeleteInActiveProductClick(inActiveProductData: InActiveProductDataInterface): void {
    const openInActiveProductDeleteDialog = this.productDeleteDialog.open(ProductDeleteDialogComponent, {
      width: '300px',
      data: {
        content: "Are you sure you want to delete this product " + inActiveProductData.ProductDescription + "?",
        productData: inActiveProductData
      },
      disableClose: true
    });

    openInActiveProductDeleteDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.listInActiveProduct();
      }
    });
  }

  public buttonAddProductClick(): void {
    const openProductDetailDialog = this.productDetailDialog.open(ProductDetailDialogComponent, {
      width: '1000px',
      data: {
        title: "Add Product",
        content: "",
        productData: null
      },
      disableClose: true
    });

    openProductDetailDialog.afterClosed().subscribe(result => {
      if (result == 200) {
        this.listActiveProduct();
      }
    });
  }

  public buttonOrderLinkClick(activeProductData: ActiveProductDataInterface): void {
    const openProductCreateOrderLinkDialog = this.productCreateOrderLinkDialog.open(ProductCreateOrderLinkDialogComponent, {
      width: '500px',
      data: {
        content: "",
        productData: activeProductData
      },
      disableClose: true
    });

    openProductCreateOrderLinkDialog.afterClosed().subscribe(result => {
      if (result == 200) {

      }
    });
  }

  ngOnInit(): void {
    this.listActiveProduct();
    this.listInActiveProduct();
  }

  ngOnDestroy() {
    if (this.listActiveProductSubscription != null) this.listActiveProductSubscription.unsubscribe();
    if (this.listInActiveProductSubscription != null) this.listInActiveProductSubscription.unsubscribe();
  }

}
