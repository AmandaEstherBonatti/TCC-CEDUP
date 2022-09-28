import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'início',
//     pathMatch: 'full',
//   },

//   {
//     path: 'incício',
//     loadChildren: () =>
//       import('./modules/home-page/home-page.module').then(
//         (m) => m.HomePageModule
//       ),
//   },
// ];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
