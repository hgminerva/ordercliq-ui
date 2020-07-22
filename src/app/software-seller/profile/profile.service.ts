import { Injectable } from '@angular/core';
import { AppSettings } from './../../app-settings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { ProfileUserModel } from './profile-user.model';
import { ProfileSecurityModel } from './profile-security.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

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

  public profileUserSubject = new Subject<ProfileUserModel>();
  public profileUserObservable = this.profileUserSubject.asObservable();

  public updateProfileSubject = new Subject<string[]>();
  public updateProfileObservable = this.updateProfileSubject.asObservable();
  public updateSecuritySubject = new Subject<string[]>();
  public updateSecurityObservable = this.updateSecuritySubject.asObservable();

  public profileUser(): void {
    let profileUserModel: ProfileUserModel = null;

    this.httpClient.get(this.defaultAPIURLHost + "/api/MstUser/profile", this.options).subscribe(
      response => {
        let results = response;

        if (results != null) {
          profileUserModel = {
            Id: results["id"],
            UserType: results["userType"],
            UserName: results["userName"],
            Password: results["password"],
            FullName: results["fullName"],
            Address: results["address"],
            ContactNumber: results["contactNumber"],
            EmailAddress: results["emailAddress"],
            Status: results["status"]
          }
        }

        this.profileUserSubject.next(profileUserModel);
      },
      error => {
        this.profileUserSubject.next(null);
      }
    );
  }

  public updateProfile(profileUserModel: ProfileUserModel): void {
    this.httpClient.put(this.defaultAPIURLHost + "/api/MstUser/profile/update", JSON.stringify(profileUserModel), this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.updateProfileSubject.next(responseResults);
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
        this.updateProfileSubject.next(errorResults);
      }
    );
  }

  public updateSecurity(profileSecurityModel: ProfileSecurityModel): void {
    this.httpClient.put(this.defaultAPIURLHost + "/api/MstUser/security/update", JSON.stringify(profileSecurityModel), this.options).subscribe(
      response => {
        let responseResults: string[] = ["success", ""];
        this.updateSecuritySubject.next(responseResults);
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
        this.updateSecuritySubject.next(errorResults);
      }
    );
  }
}
