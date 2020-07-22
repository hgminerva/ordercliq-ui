import { Injectable } from '@angular/core';
import { AppSettings } from './../../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ActiveProductDataInterface } from './product-data-interface/active-product-data-interface';
import { InActiveProductDataInterface } from './product-data-interface/inactive-product-data-interface';

import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  public listActiveProductSubject = new Subject<ActiveProductDataInterface[]>();
  public listActiveProductObservable = this.listActiveProductSubject.asObservable();
  public listInActiveProductSubject = new Subject<InActiveProductDataInterface[]>();
  public listInActiveProductObservable = this.listInActiveProductSubject.asObservable();

  public detailProductSubject = new Subject<ProductModel>();
  public detailProductObservable = this.detailProductSubject.asObservable();

  public saveProductSubject = new Subject<string[]>();
  public saveProductObservable = this.saveProductSubject.asObservable();
  public deleteProductSubject = new Subject<string[]>();
  public deleteProductObservable = this.deleteProductSubject.asObservable();

  public listActiveProduct(): void {
    let listActiveProductDataInterface: ActiveProductDataInterface[] = [];
    this.listActiveProductSubject.next(listActiveProductDataInterface);

    this.httpClient.get(this.defaultAPIURLHost + "/api/MstProduct/list/Active", this.options).subscribe(
      response => {
        let results = response;

        if (results["length"] > 0) {
          for (let i = 0; i <= results["length"] - 1; i++) {
            listActiveProductDataInterface.push({
              ButtonEdit: "Edit",
              ButtonDelete: "Delete",
              Id: results[i].id,
              ProductCode: results[i].productCode,
              ProductManualCode: results[i].productManualCode,
              ProductSKUCode: results[i].productSKUCode,
              ProductDescription: results[i].productDescription,
              Price: results[i].price,
              ButtonOrderLink: "Order Link"
            });
          }
        }

        this.listActiveProductSubject.next(listActiveProductDataInterface);
      },
      error => {
        this.listActiveProductSubject.next(listActiveProductDataInterface);
      }
    );
  }

  public listInActiveProduct(): void {
    let listInActiveProductDataInterface: InActiveProductDataInterface[] = [];
    this.listInActiveProductSubject.next(listInActiveProductDataInterface);

    this.httpClient.get(this.defaultAPIURLHost + "/api/MstProduct/list/InActive", this.options).subscribe(
      response => {
        let results = response;

        if (results["length"] > 0) {
          for (let i = 0; i <= results["length"] - 1; i++) {
            listInActiveProductDataInterface.push({
              ButtonEdit: "Edit",
              ButtonDelete: "Delete",
              Id: results[i].id,
              ProductCode: results[i].productCode,
              ProductManualCode: results[i].productManualCode,
              ProductSKUCode: results[i].productSKUCode,
              ProductDescription: results[i].productDescription,
              Price: results[i].price
            });
          }
        }

        this.listInActiveProductSubject.next(listInActiveProductDataInterface);
      },
      error => {
        this.listInActiveProductSubject.next(listInActiveProductDataInterface);
      }
    );
  }

  public detailProduct(id: number): void {
    let productModel: ProductModel = null;

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

  public saveProduct(productModel: ProductModel): void {
    if (productModel.Id == 0) {
      this.httpClient.post(this.defaultAPIURLHost + "/api/MstProduct/add", JSON.stringify(productModel), this.options).subscribe(
        response => {
          let responseResults: string[] = ["success", 'Product ' + productModel.ProductDescription + ' was successfully created!'];
          this.saveProductSubject.next(responseResults);
        },
        error => {
          let errorMessage = "";

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

          let errorResults: string[] = ["failed", errorMessage];
          this.saveProductSubject.next(errorResults);
        }
      );
    } else {
      this.httpClient.put(this.defaultAPIURLHost + "/api/MstProduct/update/" + productModel.Id, JSON.stringify(productModel), this.options).subscribe(
        response => {
          let responseResults: string[] = ["success", 'Product ' + productModel.ProductDescription + ' was successfully updated!'];
          this.saveProductSubject.next(responseResults);
        },
        error => {
          let errorMessage = "";

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

          let errorResults: string[] = ["failed", errorMessage];
          this.saveProductSubject.next(errorResults);
        }
      );
    }
  }

  public deleteProduct(id: number): void {
    this.httpClient.delete(this.defaultAPIURLHost + "/api/MstProduct/delete/" + id, this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.deleteProductSubject.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.deleteProductSubject.next(errorResults);
      }
    );
  }

  public uploadProductPhoto(fileToUpload: any): void {
    let imageOptions: any = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    };

    let input = new FormData();
    input.append("file", fileToUpload);

    this.httpClient.post(this.defaultAPIURLHost + "/api/MstProduct/uploadPhoto", input, imageOptions).subscribe(
      response => {
        let responseResults: string[] = ["success", response.toString()];
        this.saveProductSubject.next(responseResults);
      },
      error => {
        let errorResults: string[] = ["failed", error["error"]];
        this.saveProductSubject.next(errorResults);
      }
    );
  }
}
