import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DoctorComponent } from './modules/doctor/doctor.component';
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
    path: 'home',
    loadChildren: () =>
    import('./components/sidebar/sidebar.module').then(
      (m) => m.NavbarModule
    ),
  },

  {
    path: 'menu',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },

  // {
  //   path: 'feed',
  //   loadChildren: () =>
  //     import('./components/sidebar/feed/feed.module').then(
  //       (m) => m.FeedModule
  //     ),
  // },

  // {
  //   path: 'perfil',
  //   loadChildren: () =>
  //   import('./components/sidebar/perfil/perfil.module').then(
  //     (m) => m.PerfilModule
  //   )
  // },

  // {
  //   path: 'consulting',
  //   loadChildren: () =>
  //   import('./components/sidebar/consulting/consulting.module').then(
  //     (m) => m.ConsultingModule
  //   )
  // },

  // {
  //   path: 'clients',
  //   loadChildren: () =>
  //   import('./components/sidebar/clients/clients.module').then(
  //     (m) => m.ClientsModule
  //   )
  // },

  // {
  //   path: 'calendar',
  //   loadChildren: () =>
  //   import('./components/sidebar/calendar/calendar.module').then(
  //     (m) => m.CalendarModule
  //   )
  // }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
