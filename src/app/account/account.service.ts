import { Injectable } from '@angular/core';
import { AppSettings } from './../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

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

  public userTypeSubject = new Subject<string>();
  public userTypeObservable = this.userTypeSubject.asObservable();

  public getUserType(): void {
    this.httpClient.get(this.defaultAPIURLHost + "/api/MstUser/userType", this.options).subscribe(
      response => {
        let results = response;
        if (results != null) {
          this.userTypeSubject.next(results.toString());
        } else {
          this.userTypeSubject.next("");
        }
      },
      error => {
        this.userTypeSubject.next("");
      }
    );
  }

}
