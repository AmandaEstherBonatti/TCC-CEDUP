import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar.component";
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [
        // SidebarComponent
    ],
    imports: [
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule

    ],
    providers: [],
    bootstrap: [SidebarComponent]
  })
  export class NavbarModule { }
  