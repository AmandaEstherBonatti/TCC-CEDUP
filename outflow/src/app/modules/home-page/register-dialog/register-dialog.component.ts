import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-register-modal',
    templateUrl: './register-dialog.component.html',
    styleUrls: ['./register-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,

  })
  export class RegisterDialogComponent {
    
    constructor(
      public dialogRef: MatDialogRef<RegisterDialogComponent>,

      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    close() {
      this.dialogRef.close();
    }
  }