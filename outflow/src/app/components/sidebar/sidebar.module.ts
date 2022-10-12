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
        CalendarComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        FlexLayoutModule,
        MatButtonModule
    ],
    providers: [],
    bootstrap: [SidebarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarModule {}
