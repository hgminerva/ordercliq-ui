import { Injectable } from '@angular/core';
import { AppSettings } from '../../../app/app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { RegisterModel } from './register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private appSettings: AppSettings,
    private httpClient: HttpClient
  ) { }

  public defaultAPIURLHost: string = this.appSettings.APIURLHost;
  public options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public registerSubject = new Subject<[boolean, string]>();
  public registerObservable = this.registerSubject.asObservable();

  public register(registerModel: RegisterModel, captchaResponseToken: string): void {
    let url = this.defaultAPIURLHost + '/api/MstUser/register?captachaResponseToken=' + captchaResponseToken;
    let body = JSON.stringify(registerModel);
    let options = this.options;

    this.httpClient.post(url, body, options).subscribe(
      response => {
        let results = response;

        localStorage.setItem('access_token', results["accessToken"]);
        localStorage.setItem('expires_in', results["expiresIn"]);
        localStorage.setItem('username', results["userName"]);
        localStorage.setItem('full_name', results["fullName"]);
        localStorage.setItem('user_type', results["userType"]);

        this.registerSubject.next([true, results["userType"]]);
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
        } else if (error.error["message"] != null) {
          errorMessage = error.error["message"];
        } else {
          errorMessage = error["error"];
        }

        this.registerSubject.next([false, errorMessage]);
      }
    );
  }
}
