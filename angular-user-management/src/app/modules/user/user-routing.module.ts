import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserAddComponent} from "./components/user-add/user-add.component";
import {UserEditComponent} from "./components/user-edit/user-edit.component";

const routes: Routes = [
  {
    path:'',
    component: UserListComponent
  },
  {
    path: 'create',
    component: UserAddComponent
  },
  {
    path: ':id/update',
    component: UserEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
