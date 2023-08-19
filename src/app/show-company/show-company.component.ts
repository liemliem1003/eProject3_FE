import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-company',
  templateUrl: './show-company.component.html',
  styleUrls: ['./show-company.component.scss']
})
export class ShowCompanyComponent implements OnInit {
  companies: any
  paging: any
  limit: any = 10
  currentPage: any = 1
  sort: any = 'asc'
  searchvalue: any = ""

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getAllCompanies(this.limit, this.currentPage, this.sort).then((data: any) => {
      console.log(data);
      this.paging = Math.ceil(data.totalCount / this.limit)
      this.companies = data.companies
    })
  }
  SwitchPage(page: any) {
    this.currentPage = page
    if (this.searchvalue == "") {
      this.apiService.getAllCompanies(this.limit, this.currentPage, this.sort).then((data: any) => {
        console.log(data);
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.companies = data.companies
      })
    } else {
      this.apiService.getSearchCompany(this.searchvalue, this.limit, this.currentPage, this.sort).then((data: any) => {
        console.log(data);
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.companies = data.companies
      })
    }
  }
  Sort(option: any) {
    this.sort = option
    this.currentPage = 1
    if (this.searchvalue == "") {
      this.apiService.getAllCompanies(this.limit, this.currentPage, this.sort).then((data: any) => {
        console.log(data);
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.companies = data.companies
      })
    } else {
      this.apiService.getSearchCompany(this.searchvalue, this.limit, this.currentPage, this.sort).then((data: any) => {
        console.log(data);
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.companies = data.companies
      })
    }
  }
  Search(value: any) {
    this.searchvalue = value
    this.currentPage = 1
    if (value != "") {
      this.apiService.getSearchCompany(value, this.limit, this.currentPage, this.sort).then((data: any) => {
        console.log(data);
        this.companies = data.companies
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.currentPage = 1
      })
    } else {
      this.apiService.getAllCompanies(this.limit, this.currentPage, this.sort).then((data: any) => {
        console.log(data);
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.companies = data.companies
      })
    }
    return false
  }
}
