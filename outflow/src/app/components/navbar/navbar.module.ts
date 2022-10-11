import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './navbar.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
    // declarations: [NavbarComponent],
    imports: [MatIconModule, FlexLayoutModule, MatToolbarModule],
    providers: [],
    bootstrap: [NavbarComponent],
})
export class NavbarModule {}
