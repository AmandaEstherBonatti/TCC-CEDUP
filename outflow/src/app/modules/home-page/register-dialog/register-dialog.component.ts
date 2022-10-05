import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";

@Component({
    selector: 'app-register-modal',
    templateUrl: './register-dialog.component.html',
    styleUrls: ['./register-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,

  })
  export class RegisterDialogComponent {
    
    constructor(
      public dialogRef: MatDialogRef<RegisterDialogComponent>,
      private router: Router,

      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    close() {
      this.dialogRef.close();
    }

    registerPacient() {
      this.router.navigate(['/pacient']);
      this.dialogRef.close();
    }

    registerDoctor() {
      this.router.navigate(['/doctor']);
      this.dialogRef.close();
    }
  }