import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { EditPolicyComponent } from './edit-policy/edit-policy.component';
import { ShowCompanyComponent } from './show-company/show-company.component';
import { ShowPolicyComponent } from './show-policy/show-policy.component';
import { ShowEmployeeComponent } from './show-employee/show-employee.component';
import {AppComponent} from './app.component'

var logindetail = JSON.parse(localStorage.getItem("dataLogin") || "{}")
console.log(logindetail);

// login = test.userdetail

const adminRoute: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'addcompany', component: AddCompanyComponent },
  { path: 'editcompany', component: EditCompanyComponent },
  { path: 'addemployee', component: AddEmployeeComponent },
  { path: 'editemployee', component: EditEmployeeComponent },
  { path: 'addpolicy', component: AddPolicyComponent },
  { path: 'editpolicy', component: EditPolicyComponent },
  { path: 'showcompany', component: ShowCompanyComponent },
  { path: 'showpolicies', component: ShowPolicyComponent },
  { path: 'showemployee', component: ShowEmployeeComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

const employeeRout: Routes= [
  { path: 'login', component: LoginComponent },
  { path: 'editemployee', component: EditEmployeeComponent },
  { path: 'showpolicies', component: ShowPolicyComponent },
  { path: '**', redirectTo: '/showpolicies', pathMatch: 'full' },
];

const defaultRoute:Routes=
[
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
]
var routes:Routes=[];
if (logindetail?.user?.role==undefined) {
  routes = defaultRoute;
}else if(logindetail?.user?.role==1){
  routes = adminRoute;
}else if(logindetail?.user?.role==2){
  routes = employeeRout;
}

// console.log(test.userdetail?.user.id);

console.log(routes);

// xét 3 trường hợp ở @NgModule({ nếu chưa login, login vào là role nào thì hiện cái gì

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }