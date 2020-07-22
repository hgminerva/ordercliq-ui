import { Injectable } from '@angular/core';
import { AppSettings } from './../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoftwareSellerService {

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

  public isUserSellerTypeSubject = new Subject<boolean>();
  public isUserSellerObservable = this.isUserSellerTypeSubject.asObservable();

  public getIsSellerUserType(): void {
    this.httpClient.get(this.defaultAPIURLHost + "/api/MstUser/userType", this.options).subscribe(
      response => {
        let results = response;
        if (results != null) {
          if (results.toString() == "Seller") {
            this.isUserSellerTypeSubject.next(true);
          } else {
            this.isUserSellerTypeSubject.next(false);
          }
        } else {
          this.isUserSellerTypeSubject.next(false);
        }
      },
      error => {
        this.isUserSellerTypeSubject.next(false);
      }
    );
  }
}
