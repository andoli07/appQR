import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'loader',
    loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./pages/reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./access/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./access/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'controller',
    loadChildren: () => import('./admin/controller/controller.module').then( m => m.ControllerPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'profesor',
    loadChildren: () => import('./access/profesor/profesor.module').then( m => m.ProfesorPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./access/qr/qr.module').then( m => m.QrPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
