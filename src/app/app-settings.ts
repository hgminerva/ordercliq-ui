import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

export class AppSettings {
    // public APIURLHost = "https://localhost:44373";
    public APIURLHost = "https://orderfolder.azurewebsites.net";
    public snackBarHorizontalPosition: MatSnackBarHorizontalPosition = 'left';
    public snackBarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
}