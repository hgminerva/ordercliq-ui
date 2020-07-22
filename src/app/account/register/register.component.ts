import { Component, OnInit, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { RegisterService } from './register.service';

import { RegisterModel } from './register.model';

import { RegisterErrorDialogComponent } from './register-error-dialog/register-error-dialog.component'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private registerErrorDialog: MatDialog,
  ) { }

  public registerSubscribe: any;
  public registerModel: RegisterModel = {
    UserType: "",
    UserName: "",
    Password: "",
    FullName: "",
    Address: "NA",
    ContactNumber: "NA",
    EmailAddress: "",
    Status: "Active"
  };

  public captchaResponseToken: string = "";

  public confirmPassword: string = "";

  public passwordHide = true;
  public confirmPasswordHide = true;

  public linkLoginPageClick(): void {
    let productId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('productId'));
    if (productId != null || productId != 0) {
      this.router.navigate(['/account/login/' + productId]);
    } else {
      this.router.navigate(['/account/login/0']);
    }
  }

  public register(): void {
    let buttonRegister: Element = document.getElementById("buttonRegister");
    buttonRegister.setAttribute("disabled", "disabled");

    let fieldErrorMessage = "";
    let isValid = false;

    if (this.registerModel.UserType === "") {
      fieldErrorMessage = "User type is required.";
    } else if (this.registerModel.FullName === "") {
      fieldErrorMessage = "Full name is required.";
    } else if (this.registerModel.UserName === "") {
      fieldErrorMessage = "Username is required.";
    } else if (this.registerModel.Password === "") {
      fieldErrorMessage = "Password is required.";
    } else if (this.confirmPassword === "") {
      fieldErrorMessage = "Confirm Password is required.";
    } else if (this.registerModel.Password !== this.confirmPassword) {
      fieldErrorMessage = "Password and confirm password did not match.";
    } else if (this.registerModel.Address === "") {
      fieldErrorMessage = "Address is required.";
    } else if (this.registerModel.ContactNumber === "") {
      fieldErrorMessage = "Contact number is required.";
    } else if (this.registerModel.EmailAddress === "") {
      fieldErrorMessage = "Email address is required.";
    } else if (this.captchaResponseToken === "" || this.captchaResponseToken === null) {
      fieldErrorMessage = "Catpcha is Required.";
    } else {
      isValid = true;
    }

    if (isValid == false) {
      const openRegisterErrorDialog = this.registerErrorDialog.open(RegisterErrorDialogComponent, {
        width: '300px',
        data: { errorMessage: fieldErrorMessage },
        disableClose: true
      });

      openRegisterErrorDialog.afterClosed().subscribe(result => {
        if (result == 200) {
          buttonRegister.removeAttribute("disabled");
        }
      });
    } else {
      this.registerService.register(this.registerModel, this.captchaResponseToken);
      this.registerSubscribe = this.registerService.registerObservable.subscribe(
        data => {
          if (data[0]) {

            let productId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('productId'));
            if (productId != 0) {
              if (data[1] === "Buyer") {
                setTimeout(() => {
                  this.router.navigate(['/software-buyer-order/create-order/' + productId]);
                }, 500);
              } else if (data[1] === "Seller") {
                setTimeout(() => {
                  this.router.navigate(['/software-seller']);
                }, 500);
              } else {

              }
            } else {
              switch (data[1]) {
                case "Buyer": {
                  setTimeout(() => {
                    this.router.navigate(['/software-buyer']);
                  }, 500);

                  break;
                }
                case "Seller": {
                  setTimeout(() => {
                    this.router.navigate(['/software-seller']);
                  }, 500);

                  break;
                }
                default: {
                  break;
                }
              }
            }
          } else {
            const openRegisterErrorDialog = this.registerErrorDialog.open(RegisterErrorDialogComponent, {
              width: '300px',
              data: { errorMessage: data[1] },
              disableClose: true
            });

            openRegisterErrorDialog.afterClosed().subscribe(result => {
              if (result == 200) {
                buttonRegister.removeAttribute("disabled");
              }
            });
          }

          if (this.registerSubscribe != null) this.registerSubscribe.unsubscribe();
        }
      );
    }
  }

  public resolved(captchaResponse: string) {
    this.captchaResponseToken = captchaResponse;
  }

  ngOnInit() {
    let user_type: string = this.activatedRoute.snapshot.paramMap.get('user_type');
    if (user_type === "Buyer") {
      this.registerModel.UserType = "Buyer";
    }

    if (user_type === "Seller") {
      this.registerModel.UserType = "Seller";
    }
  }

  ngOnDestroy() {
    if (this.registerSubscribe != null) this.registerSubscribe.unsubscribe();
  }

}
