import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PageInitialComponent } from './page-initial/page-initial.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';



const routes: Routes = [
  {
    path: 'inicial',
    component: PageInitialComponent
  },

];

@NgModule({
  declarations: [
    PageInitialComponent,
    RegisterDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,

  ],
  providers: [],
  entryComponents: [RegisterDialogComponent],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class HomePageModule { }