import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { EditPolicyComponent } from './edit-policy/edit-policy.component';
import { ShowCompanyComponent } from './show-company/show-company.component';

var login = localStorage.getItem("dataLogin")!=null?true:false;
var dataLogin = JSON.parse(localStorage.getItem("dataLogin") || "{}");


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'addcompany', component: AddCompanyComponent },
  { path: 'editcompany', component: EditCompanyComponent },
  { path: 'addemployee', component: AddEmployeeComponent },
  { path: 'editemployee', component: EditEmployeeComponent },
  { path: 'addpolicy', component: AddPolicyComponent },
  { path: 'editpolicy', component: EditPolicyComponent },
  { path: 'showcompany', component: ShowCompanyComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];
// xét 3 trường hợp ở @NgModule({ nếu chưa login, login vào là role nào thì hiện cái gì
const routes2: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];


@NgModule({
  imports: [RouterModule.forRoot(
    login ? routes : [
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '/login', pathMatch: 'full' },
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }