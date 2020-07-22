import { Component, OnInit, ViewChild, TemplateRef, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { LoginService } from './login.service';
import { LoginModel } from './login.model';

import { LoginErrorDialogComponent } from './login-error-dialog/login-error-dialog.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginErrorDialog: MatDialog,
  ) { }

  public loginSubscribe: any;
  public loginModel: LoginModel = {
    UserName: "",
    Password: ""
  };

  public passwordHide = true;

  public linkRegisterPageClick(): void {
    let productId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('productId'));
    if (productId != null || productId != 0) {
      this.router.navigate(['/account/register/Buyer/' + productId]);
    } else {
      this.router.navigate(['/account/register/Buyer/0']);
    }
  }

  public login(): void {
    let buttonLogin: Element = document.getElementById("buttonLogin");
    buttonLogin.setAttribute("disabled", "disabled");

    if (this.loginModel.UserName === "" || this.loginModel.Password === "") {
      const openLoginErrorDialog = this.loginErrorDialog.open(LoginErrorDialogComponent, {
        width: '300px',
        data: { errorMessage: "Username or Password is required." },
        disableClose: true
      });

      openLoginErrorDialog.afterClosed().subscribe(result => {
        if (result == 200) {
          buttonLogin.removeAttribute("disabled");
        }
      });
    } else {
      this.loginService.login(this.loginModel);
      this.loginSubscribe = this.loginService.loginObservable.subscribe(
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
            const openLoginErrorDialog = this.loginErrorDialog.open(LoginErrorDialogComponent, {
              width: '300px',
              data: { errorMessage: data[1] },
              disableClose: true
            });

            openLoginErrorDialog.afterClosed().subscribe(result => {
              if (result == 200) {
                buttonLogin.removeAttribute("disabled");
              }
            });
          }

          if (this.loginSubscribe != null) this.loginSubscribe.unsubscribe();
        }
      );
    }
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    if (this.loginSubscribe != null) this.loginSubscribe.unsubscribe();
  }
}