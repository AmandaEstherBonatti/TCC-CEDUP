import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { PerfilComponent } from './perfil/perfil.component';
import { FeedComponent } from './feed/feed.component';
import { ConsultingComponent } from './consulting/consulting.component';
import { ClientsComponent } from './clients/clients.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';


import { FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { GiphyDialogComponent } from './feed/giphy-dialog/giphy-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [
    {
        path: '',
        component: SidebarComponent
    },
    {
        path: 'feed',
        component: FeedComponent
    },
    {
        path: 'perfil',
        component: PerfilComponent
    },
    {
        path: 'consulting',
        component: ConsultingComponent
    },
    {
        path: 'clients',
        component: ClientsComponent
    },
    {
        path: 'calendar',
        component: CalendarComponent
    },
];

@NgModule({
    declarations: [
        SidebarComponent,
        PerfilComponent,
        FeedComponent,
        ConsultingComponent,
        ClientsComponent,
        CalendarComponent,
        GiphyDialogComponent

    ],
    imports: [
        RouterModule.forChild(routes),
        MatSelectModule,
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatDialogModule,
        PickerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatIconModule,
        MatChipsModule,
        MatAutocompleteModule,




    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarModule { }
