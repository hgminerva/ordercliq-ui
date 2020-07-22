import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from './profile.service';
import { ProfileUserModel } from './profile-user.model';
import { ProfileSecurityModel } from './profile-security.model';

import { AppSettings } from './../../app-settings';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public profileService: ProfileService,
    public appSettings: AppSettings,
    private snackBar: MatSnackBar
  ) { }

  public profileUserSubscription: any;
  public profileUserModel: ProfileUserModel = {
    Id: 0,
    UserType: "Buyer",
    UserName: localStorage.getItem('username'),
    Password: "NA",
    FullName: "",
    Address: "",
    ContactNumber: "",
    EmailAddress: "",
    Status: "NA"
  };

  public updateProfileUserSubscription: any;
  public updateProfileSecuritySubscription: any;

  public profileSecurityModel: ProfileSecurityModel = {
    CurrentPassword: "",
    NewPassword: "",
    ConfirmPassword: ""
  };

  public profileSpinnerHidden: boolean = false;
  public profileSpinnerContentHidden: boolean = true;

  public getProfileUserData(): void {
    this.profileService.profileUser();
    this.profileUserSubscription = this.profileService.profileUserObservable.subscribe(
      data => {
        if (data != null) {
          this.profileUserModel = {
            Id: data.Id,
            UserType: data.UserType,
            UserName: data.UserName,
            Password: "NA",
            FullName: data.FullName,
            Address: data.Address,
            ContactNumber: data.ContactNumber,
            EmailAddress: data.EmailAddress,
            Status: data.Status
          };
        }

        this.profileSpinnerHidden = true;
        this.profileSpinnerContentHidden = false;

        if (this.profileUserSubscription != null) this.profileUserSubscription.unsubscribe();
      }
    );
  }

  public buttonUpdateProfileClick(): void {
    let buttonUpdateProfile: Element = document.getElementById("buttonUpdateProfile");
    buttonUpdateProfile.setAttribute("disabled", "disabled");

    let modelrrorMessage = "";
    let isValid = false;

    if (this.profileUserModel.FullName === "") {
      modelrrorMessage = "Full name is required.";
    } else if (this.profileUserModel.Address === "") {
      modelrrorMessage = "Address required.";
    } else if (this.profileUserModel.ContactNumber === "") {
      modelrrorMessage = "Contact number is required.";
    } else if (this.profileUserModel.EmailAddress === "") {
      modelrrorMessage = "Email address is required.";
    } else {
      isValid = true;
    }

    if (isValid == false) {
      this.snackBar.open(modelrrorMessage, '', {
        duration: 3000,
        horizontalPosition: this.appSettings.snackBarHorizontalPosition,
        verticalPosition: this.appSettings.snackBarVerticalPosition,
        panelClass: ["orange-snackbar"]
      });

      buttonUpdateProfile.removeAttribute("disabled");
    } else {
      this.profileService.updateProfile(this.profileUserModel);
      this.updateProfileUserSubscription = this.profileService.updateProfileObservable.subscribe(
        data => {
          if (data[0] == "success") {
            this.snackBar.open('Profile update successful.', '', {
              duration: 3000,
              horizontalPosition: this.appSettings.snackBarHorizontalPosition,
              verticalPosition: this.appSettings.snackBarVerticalPosition,
              panelClass: ["green-snackbar"]
            });
          } else if (data[0] == "failed") {
            this.snackBar.open(data[1], '', {
              duration: 3000,
              horizontalPosition: this.appSettings.snackBarHorizontalPosition,
              verticalPosition: this.appSettings.snackBarVerticalPosition,
              panelClass: ["orange-snackbar"]
            });
          }

          buttonUpdateProfile.removeAttribute("disabled");
          if (this.updateProfileUserSubscription != null) this.updateProfileUserSubscription.unsubscribe();
        }
      );
    }
  }

  public buttonUpdateSecurityClick(): void {
    let buttonUpdateSecurity: Element = document.getElementById("buttonUpdateSecurity");
    buttonUpdateSecurity.setAttribute("disabled", "disabled");

    let modelrrorMessage = "";
    let isValid = false;

    if (this.profileSecurityModel.CurrentPassword === "") {
      modelrrorMessage = "Current password is required.";
    } else if (this.profileSecurityModel.NewPassword === "") {
      modelrrorMessage = "New password is required.";
    } else if (this.profileSecurityModel.ConfirmPassword === "") {
      modelrrorMessage = "Confirm password is required.";
    } else if (this.profileSecurityModel.NewPassword !== this.profileSecurityModel.ConfirmPassword) {
      modelrrorMessage = "New password and confirm password did not match.";
    } else {
      isValid = true;
    }

    if (isValid == false) {
      this.snackBar.open(modelrrorMessage, '', {
        duration: 3000,
        horizontalPosition: this.appSettings.snackBarHorizontalPosition,
        verticalPosition: this.appSettings.snackBarVerticalPosition,
        panelClass: ["orange-snackbar"]
      });

      buttonUpdateSecurity.removeAttribute("disabled");
    } else {
      this.profileService.updateSecurity(this.profileSecurityModel);
      this.updateProfileSecuritySubscription = this.profileService.updateSecurityObservable.subscribe(
        data => {
          if (data[0] == "success") {
            this.snackBar.open('Security update successful.', '', {
              duration: 3000,
              horizontalPosition: this.appSettings.snackBarHorizontalPosition,
              verticalPosition: this.appSettings.snackBarVerticalPosition,
              panelClass: ["green-snackbar"]
            });
          } else if (data[0] == "failed") {
            this.snackBar.open(data[1], '', {
              duration: 3000,
              horizontalPosition: this.appSettings.snackBarHorizontalPosition,
              verticalPosition: this.appSettings.snackBarVerticalPosition,
              panelClass: ["orange-snackbar"]
            });
          }

          buttonUpdateSecurity.removeAttribute("disabled");
          if (this.updateProfileSecuritySubscription != null) this.updateProfileSecuritySubscription.unsubscribe();
        }
      );
    }
  }

  ngOnInit(): void {
    this.getProfileUserData();
  }

  ngOnDestroy() {
    if (this.profileUserSubscription != null) this.profileUserSubscription.unsubscribe();
    if (this.updateProfileUserSubscription != null) this.updateProfileUserSubscription.unsubscribe();
    if (this.updateProfileSecuritySubscription != null) this.updateProfileSecuritySubscription.unsubscribe();
  }

}
