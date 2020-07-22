import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-error-dialog',
  templateUrl: './register-error-dialog.component.html',
  styleUrls: ['./register-error-dialog.component.css']
})
export class RegisterErrorDialogComponent implements OnInit {

  constructor(
    public registerErrorDialogComponent: MatDialogRef<RegisterErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public registerErrorDialogData: any
  ) { }

  public dialogTitle: string = "Register Error";
  public dialogContent: string = this.registerErrorDialogData.errorMessage;

  public buttonRegisterErrorDialogOKClick(): void {
    this.registerErrorDialogComponent.close(200);
  }

  ngOnInit(): void {

  }

}
