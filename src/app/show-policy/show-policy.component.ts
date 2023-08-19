import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-policy',
  templateUrl: './show-policy.component.html',
  styleUrls: ['./show-policy.component.scss']
})
export class ShowPolicyComponent implements OnInit {
  companies: any
  policies: any
  paging: any
  limit: any = 10
  currentPage: any = 1
  sort: any = 'asc'
  searchvalue: any = ""

  constructor(private apiService: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.apiService.getAllCompanies(1000, 1).then((data: any) => {
      this.companies = data
      for (let i = 0; i < data.companies.length; i++) {
        this.companies[data.companies[i].companyId] = data.companies[i]
      }
    })
    this.apiService.getAllPolicies(this.limit, this.currentPage, this.sort).then((data: any) => {
      this.policies = data.policies
      this.paging = Math.ceil(data.totalCount / this.limit)
      for (let i = 0; i < this.policies.length; i++) {
        this.policies[i].company = this.companies[this.policies[i].companyId]
      }
      console.log(data);
    })
  }
  Search(value: any) {
    this.searchvalue = value
    this.currentPage = 1
    if (value == "") {
      this.apiService.getAllPolicies(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.policies = data.policies
        this.paging = Math.ceil(data.totalCount / this.limit)
        for (let i = 0; i < this.policies.length; i++) {
          this.policies[i].company = this.companies[this.policies[i].companyId]
        }
        console.log(data);
      })
    } else {
      this.apiService.getSearchPolicy(value, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.policies = data.policies
        this.paging = Math.ceil(data.totalCount / this.limit)
        for (let i = 0; i < this.policies.length; i++) {
          this.policies[i].company = this.companies[this.policies[i].companyId]
        }
        console.log(data);
      })
    }
    return false
  }
  Sort(option: any) {
    this.sort = option
    this.currentPage = 1
    if(this.searchvalue==""){
      this.apiService.getAllPolicies(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.policies = data.policies
        for (let i = 0; i < this.policies.length; i++) {
          this.policies[i].company = this.companies[this.policies[i].companyId]
        }
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.policies = data.policies
      })
    }else{
      this.apiService.getSearchPolicy(this.searchvalue, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.policies = data.policies
        this.paging = Math.ceil(data.totalCount / this.limit)
        for (let i = 0; i < this.policies.length; i++) {
          this.policies[i].company = this.companies[this.policies[i].companyId]
        }
        console.log(data);
      })
    }
    
  }
  SwitchPage(page: any) {
    this.currentPage = page
    if(this.searchvalue==""){
      this.apiService.getAllPolicies(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.policies = data.policies
        for (let i = 0; i < this.policies.length; i++) {
          this.policies[i].company = this.companies[this.policies[i].companyId]
        }
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.policies = data.policies
      })
    }else{
      this.apiService.getSearchPolicy(this.searchvalue, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.policies = data.policies
        this.paging = Math.ceil(data.totalCount / this.limit)
        for (let i = 0; i < this.policies.length; i++) {
          this.policies[i].company = this.companies[this.policies[i].companyId]
        }
        console.log(data);
      })
    }
  }
}
