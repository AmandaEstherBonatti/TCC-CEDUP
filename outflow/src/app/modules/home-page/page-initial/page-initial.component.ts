import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'app-page-initial',
  templateUrl: './page-initial.component.html',
  styleUrls: ['./page-initial.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageInitialComponent {

  constructor(
    public dialog: MatDialog,
  ) { }


  openDialog() {
    const dialogRef = this.dialog.open(RegisterDialogComponent, {
      width: "800px",
      height: "500px",
    });


  }



}
