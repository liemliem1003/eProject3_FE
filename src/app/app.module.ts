import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddPolicyComponent } from './add-policy/add-policy.component';
import { EditPolicyComponent } from './edit-policy/edit-policy.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ShowCompanyComponent } from './show-company/show-company.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { ShowPolicyComponent } from './show-policy/show-policy.component';
import { ShowEmployeeComponent } from './show-employee/show-employee.component';
import { AddPolicyonuserComponent } from './add-policyonuser/add-policyonuser.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddCompanyComponent,
    AddEmployeeComponent,
    AddPolicyComponent,
    EditPolicyComponent,
    EditEmployeeComponent,
    EditCompanyComponent,
    ShowCompanyComponent,
    HeaderComponent,
    ShowPolicyComponent,
    ShowEmployeeComponent,
    AddPolicyonuserComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
