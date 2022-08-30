import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


import { map } from 'rxjs/operators';

const routes: Routes = [
  {
    path:'',
    redirectTo:"home",
    pathMatch: 'full'
 },
  
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
 
  },
 
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
 
  },
 
  {
    path: 'empleados',
    loadChildren: () => import('./pages/empleados/empleados.module').then( m => m.EmpleadosPageModule),

  },
  {
    path: 'list-empleados',
    loadChildren: () => import('./pages/list-empleados/list-empleados.module').then( m => m.ListEmpleadosPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
