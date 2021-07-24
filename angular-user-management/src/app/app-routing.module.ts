import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MasterComponent} from "./components/layouts/master/master.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [

  {
    path: 'admin',
    redirectTo: 'admin/user'
  },
  {
    path:'admin',
    component: MasterComponent,
    children: [
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then(module => module.UserModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
