import { Injectable } from '@angular/core';
import { AppSettings } from '../../../app/app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LoginModel } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  public loginSubject = new Subject<[boolean, string]>();
  public loginObservable = this.loginSubject.asObservable();

  public login(loginModel: LoginModel): void {
    let url = this.defaultAPIURLHost + '/api/SysUserAuthentication/authenticate';
    let body = JSON.stringify(loginModel);
    let options = this.options;

    this.httpClient.post(url, body, options).subscribe(
      response => {
        let results = response;

        localStorage.setItem('access_token', results["accessToken"]);
        localStorage.setItem('expires_in', results["expiresIn"]);
        localStorage.setItem('username', results["userName"]);
        localStorage.setItem('full_name', results["fullName"]);
        localStorage.setItem('user_type', results["userType"]);

        this.loginSubject.next([true, results["userType"]]);
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
          errorMessage = error.error["message"];
        }

        this.loginSubject.next([false, errorMessage]);
      }
    );
  }
}