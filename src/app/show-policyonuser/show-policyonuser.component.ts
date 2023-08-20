import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';
import { parse, format } from 'date-fns';

@Component({
  selector: 'app-show-policyonuser',
  templateUrl: './show-policyonuser.component.html',
  styleUrls: ['./show-policyonuser.component.scss']
})
export class ShowPolicyonuserComponent implements OnInit {
  data:any
  paging: any
  limit:any = 10
  currentPage:any = 1
  sort:any='asc'
  searchvalue:any=""
  dataDetail:any ={
    availableAmount:0,
    endate:"",
    id:0,
    policyId:0,
    startDate: "",
    userId:0,
  }
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getPolicyOnUser(this.limit, this.currentPage, this.sort).then((data: any) => {
      this.paging = Math.ceil(data.totalCount / this.limit)
      data = data.policyOnUsers
      for (let i = 0; i < data.length; i++) {
        data[i].endDate = this.ConvertDateToInput(data[i].endDate)
        data[i].startDate = this.ConvertDateToInput(data[i].startDate)
        this.apiService.getEmployeeByID(data[i].userId).then((userData:any)=>{
          data[i].userInfor = userData
        })
        this.apiService.getPolicyByID(data[i].policyId).then((policyData:any)=>{
          this.apiService.getCompanyByID(policyData.companyId).then((companyData:any)=>{
            policyData.companyInfor = companyData
          })
          data[i].policyInfor = policyData
        })
        data[i].disabled = this.ActivateClaim(data[i].startDate,data[i].endDate)
      }
      this.data = data
      console.log(data);
      
    })
  }
  // Date control
  ConvertDateToInput(inputDate: any) {
    inputDate = new Date(inputDate);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }
  Search(value: any) {
    this.searchvalue = value
    this.currentPage = 1
    if (value == "") {
      this.apiService.getPolicyOnUser(this.limit, this.currentPage, this.sort).then((data: any) => {
        console.log(data);
        this.paging = Math.ceil(data.totalCount / this.limit)
        data = data.policyOnUsers
        for (let i = 0; i < data.length; i++) {
          data[i].endDate = this.ConvertDateToInput(data[i].endDate)
          data[i].startDate = this.ConvertDateToInput(data[i].startDate)
          this.apiService.getEmployeeByID(data[i].userId).then((userData:any)=>{
            data[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data[i].policyId).then((policyData:any)=>{
            this.apiService.getCompanyByID(policyData.companyId).then((companyData:any)=>{
              policyData.companyInfor = companyData
            })
            data[i].policyInfor = policyData
          })
        }
        this.data = data
      })
    } else {
      this.apiService.getSearchPolicyOnUser(value,this.limit, this.currentPage, this.sort).then((data: any) => {
        console.log(data);

        this.paging = Math.ceil(data.TotalCount / this.limit)
        data = data.PolicyOnUsers["$values"]
        for (let i = 0; i < data.length; i++) {
          data[i].availableAmount = data[i].AvailableAmount
          data[i].endate = data[i].Endate
          data[i].id = data[i].Id
          data[i].policyId = data[i].PolicyId
          data[i].startDate = data[i].StartDate
          data[i].userId = data[i].UserId
          data[i].endDate = this.ConvertDateToInput(data[i].endDate)
          data[i].startDate = this.ConvertDateToInput(data[i].startDate)
          this.apiService.getEmployeeByID(data[i].userId).then((userData:any)=>{
            data[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data[i].policyId).then((policyData:any)=>{
            this.apiService.getCompanyByID(policyData.companyId).then((companyData:any)=>{
              policyData.companyInfor = companyData
            })
            data[i].policyInfor = policyData
          })
        }
        this.data = data
      })
    }
    return false
  }
  Sort(option: any) {
    this.sort = option
    this.currentPage = 1
    if (this.searchvalue == "") {
      this.apiService.getPolicyOnUser(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.paging = Math.ceil(data.totalCount / this.limit)
        data = data.policyOnUsers
        for (let i = 0; i < data.length; i++) {
          data[i].endDate = this.ConvertDateToInput(data[i].endDate)
          data[i].startDate = this.ConvertDateToInput(data[i].startDate)
          this.apiService.getEmployeeByID(data[i].userId).then((userData:any)=>{
            data[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data[i].policyId).then((policyData:any)=>{
            this.apiService.getCompanyByID(policyData.companyId).then((companyData:any)=>{
              policyData.companyInfor = companyData
            })
            data[i].policyInfor = policyData
          })
        }
        this.data = data
      })
    } else {
      this.apiService.getSearchEmployee(this.searchvalue, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.data = data.employees
        console.log(data);
        this.paging = Math.ceil(data.totalCount / this.limit)
        this.currentPage = 1
      })
    }
  }
  SwitchPage(page: any) {
    this.currentPage = page
    if(this.searchvalue==""){
      this.apiService.getPolicyOnUser(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.paging = Math.ceil(data.totalCount / this.limit)
        data = data.policyOnUsers
        for (let i = 0; i < data.length; i++) {
          data[i].endDate = this.ConvertDateToInput(data[i].endDate)
          data[i].startDate = this.ConvertDateToInput(data[i].startDate)
          this.apiService.getEmployeeByID(data[i].userId).then((userData:any)=>{
            data[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data[i].policyId).then((policyData:any)=>{
            this.apiService.getCompanyByID(policyData.companyId).then((companyData:any)=>{
              policyData.companyInfor = companyData
            })
            data[i].policyInfor = policyData
          })
        }
        this.data = data
      })
    }
  }
  ActivateClaim(start:any,end:any){
    const currentDate = new Date();
    start = parse(start, 'dd-MM-yyyy', new Date());
    end = parse(end, 'dd-MM-yyyy', new Date());
    if(start<=currentDate && currentDate <= end){
      return false
    }else{
      return true
    }
  }
}
