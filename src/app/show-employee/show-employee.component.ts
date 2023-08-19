import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.scss']
})
export class ShowEmployeeComponent implements OnInit {
  employees: any
  paging: any
  limit: any = 1
  currentPage: any = 1
  sort: any = 'asc'
  searchvalue:any =""
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getEmployees(this.limit, this.currentPage, this.sort).then((data: any) => {
      this.employees = data.employees
      console.log(data);
      this.paging = Math.ceil(data.totalCount / this.limit)
    })
  }
  Search(value: any) {
    this.searchvalue = value
    if (value == "") {
      this.apiService.getEmployees(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.employees = data.employees
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.currentPage = 1
      })
    } else {
      this.apiService.getSearchEmployee(value, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.employees = data.employees
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.currentPage = 1
      })
    }
    return false
  }
  Sort(option: any) {
    this.sort = option
    this.currentPage = 1
    if (this.searchvalue == "") {
      this.apiService.getEmployees(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.employees = data.employees
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.currentPage = 1
      })
    } else {
      this.apiService.getSearchEmployee(this.searchvalue, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.employees = data.employees
        console.log(data);
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.currentPage = 1
      })
    }
  }
  SwitchPage(page: any) {
    this.currentPage = page
    if (this.searchvalue == "") {
      this.apiService.getEmployees(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.employees = data.employees
        this.paging = Math.ceil(data.totalCount / this.limit)
      })
    } else {
      this.apiService.getSearchEmployee(this.searchvalue, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.employees = data.employees
        this.paging = Math.ceil(data.totalCount / this.limit)
      })
    }
  }
}
