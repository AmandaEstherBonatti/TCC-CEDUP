import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DoctorComponent } from './modules/doctor/doctor.component';
import { FeedModule } from './modules/feed/feed.module';
import { PageInitialComponent } from './modules/home-page/page-initial/page-initial.component';
import { LoginComponent } from './modules/login/login.component';
import { PacientComponent } from './modules/pacient/pacient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/inicial',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'pacient',
    component: PacientComponent
  },

  {
    path: 'doctor',
    component: DoctorComponent
  },

  {
    path: 'sidebar',
    component: SidebarComponent
  },

  {
    path: 'menu',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },

  {
    path: 'feed',
    loadChildren: () =>
      import('./modules/feed/feed.module').then(
        (m) => m.FeedModule
      ),
  },

  {
    path: 'perfil',
    loadChildren: () =>
    import('./modules/perfil/perfil.module').then(
      (m) => m.PerfilModule
    )
  },

  {
    path: 'consulting',
    loadChildren: () =>
    import('./modules/consulting/consulting.module').then(
      (m) => m.ConsultingModule
    )
  },

  {
    path: 'clients',
    loadChildren: () =>
    import('./modules/clients/clients.module').then(
      (m) => m.ClientsModule
    )
  },

  {
    path: 'calendar',
    loadChildren: () =>
    import('./modules/calendar/calendar.module').then(
      (m) => m.CalendarModule
    )
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
