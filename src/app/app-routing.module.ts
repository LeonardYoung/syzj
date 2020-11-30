/*
 * @Author: your name
 * @Date: 2020-11-19 11:10:09
 * @LastEditTime: 2020-11-30 14:19:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \syzj\src\app\app-routing.module.ts
 */
import { StartAppGuard } from './core/start-app.guard';
import { TabsPage } from './tabs/tabs.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './routes/passport/login/login.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'guide', pathMatch: 'full'
    // loadChildren: () => import('./pages/pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  {
    path: 'guide',
    loadChildren: () => import('./routes/guide/guide.module').then( m => m.GuidePageModule),
    canActivate: [StartAppGuard]
  },
  {
    path: 'passport',
    loadChildren: () => import('./routes/passport/passport.module').then( m => m.PassportModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
