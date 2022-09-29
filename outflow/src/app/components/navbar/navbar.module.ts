import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { NavbarComponent } from "./navbar.component";

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        MatIconModule,
    ],
    providers: [],
    bootstrap: [NavbarComponent]
  })
  export class NavbarModule { }
  