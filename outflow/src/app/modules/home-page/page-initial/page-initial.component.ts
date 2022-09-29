import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-page-initial',
  templateUrl: './page-initial.component.html',
  styleUrls: ['./page-initial.component.scss']
})
export class PageInitialComponent {

  constructor(
    public dialog: MatDialog,

  ) {}


  openDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: "500px",
      height: "400px",
    });


  }

}
