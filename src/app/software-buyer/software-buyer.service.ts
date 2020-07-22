import { Injectable } from '@angular/core';
import { AppSettings } from './../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoftwareBuyerService {

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

  public isUserBuyerTypeSubject = new Subject<boolean>();
  public isUserBuyerObservable = this.isUserBuyerTypeSubject.asObservable();

  public getIsBuyerUserType(): void {
    this.httpClient.get(this.defaultAPIURLHost + "/api/MstUser/userType", this.options).subscribe(
      response => {
        let results = response;
        if (results != null) {
          if (results.toString() == "Buyer") {
            this.isUserBuyerTypeSubject.next(true);
          } else {
            this.isUserBuyerTypeSubject.next(false);
          }
        } else {
          this.isUserBuyerTypeSubject.next(false);
        }
      },
      error => {
        this.isUserBuyerTypeSubject.next(false);
      }
    );
  }
}
