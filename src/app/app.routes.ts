import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.page').then((m) => m.LoginPage),
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./register/register.page').then((m) => m.RegisterPage),
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    },  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage)
  },
  {
    path: 'map',
    loadComponent: () => import('./map/map.page').then( m => m.MapPage)
  },

];
