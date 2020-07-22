import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-error-dialog',
  templateUrl: './login-error-dialog.component.html',
  styleUrls: ['./login-error-dialog.component.css']
})
export class LoginErrorDialogComponent implements OnInit {

  constructor(
    public loginErrorDialogComponent: MatDialogRef<LoginErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public loginErrorDialogData: any
  ) { }

  public dialogTitle: string = "Login Error";
  public dialogContent: string = this.loginErrorDialogData.errorMessage;

  public buttonLoginErrorDialogOKClick(): void {
    this.loginErrorDialogComponent.close(200);
  }

  ngOnInit(): void {

  }

}
