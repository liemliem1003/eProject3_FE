import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-claim',
  templateUrl: './show-claim.component.html',
  styleUrls: ['./show-claim.component.scss']
})
export class ShowClaimComponent implements OnInit {
  data: any
  paging: any
  limit: any = 10
  currentPage: any = 1
  sort: any = 'asc'
  searchvalue: any = ""
  startDate:any = 0
  endDate:any = 0
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getClaims(this.limit, this.currentPage, this.sort).then((data: any) => {
      this.paging = Math.ceil(data.totalCount / this.limit)
      for (let i = 0; i < data.claims.length; i++) {
        this.apiService.getEmployeeByID(data.claims[i].userId).then((userData: any) => {
          data.claims[i].userInfor = userData
        })
        this.apiService.getPolicyByID(data.claims[i].policyId).then((policyData: any) => {
          this.apiService.getCompanyByID(policyData.companyId).then((companyData: any) => {
            policyData.companyInfor = companyData
          })
          data.claims[i].policyInfor = policyData
        })
      }
      console.log(data);
      
      this.data = data.claims
    })
  }
  //Date control
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
      this.apiService.getClaims(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.paging = Math.ceil(data.totalCount / this.limit)
        for (let i = 0; i < data.claims.length; i++) {
          this.apiService.getEmployeeByID(data.claims[i].userId).then((userData: any) => {
            data.claims[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data.claims[i].policyId).then((policyData: any) => {
            this.apiService.getCompanyByID(policyData.companyId).then((companyData: any) => {
              policyData.companyInfor = companyData
            })
            data.claims[i].policyInfor = policyData
          })
        }
        this.data = data.claims
      })
    } else {
      this.apiService.getSearchClaim(value, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.data = data.employees
        console.log(data.Claims);
        console.log(data.Claims['$id']);
        
        for (let i = 0; i < data.claims.length; i++) {
          this.apiService.getEmployeeByID(data.claims[i].userId).then((userData: any) => {
            data.claims[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data.claims[i].policyId).then((policyData: any) => {
            this.apiService.getCompanyByID(policyData.companyId).then((companyData: any) => {
              policyData.companyInfor = companyData
            })
            data.claims[i].policyInfor = policyData
          })
        }
        this.data = data.claims
        this.paging = Math.ceil(data.totalCount / this.limit)
      })
    }
    return false
  }
  Sort(option: any) {
    this.sort = option
    this.currentPage = 1
    if (this.searchvalue == "") {
      this.apiService.getClaims(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.paging = Math.ceil(data.totalCount / this.limit)
        for (let i = 0; i < data.claims.length; i++) {
          this.apiService.getEmployeeByID(data.claims[i].userId).then((userData: any) => {
            data.claims[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data.claims[i].policyId).then((policyData: any) => {
            this.apiService.getCompanyByID(policyData.companyId).then((companyData: any) => {
              policyData.companyInfor = companyData
            })
            data.claims[i].policyInfor = policyData
          })
        }
        this.data = data.claims
      })
    } else {
      this.apiService.getSearchClaim(this.searchvalue, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.data = data.employees
        for (let i = 0; i < data.claims.length; i++) {
          this.apiService.getEmployeeByID(data.claims[i].userId).then((userData: any) => {
            data.claims[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data.claims[i].policyId).then((policyData: any) => {
            this.apiService.getCompanyByID(policyData.companyId).then((companyData: any) => {
              policyData.companyInfor = companyData
            })
            data.claims[i].policyInfor = policyData
          })
        }
        this.data = data.claims
        this.paging = Math.ceil(data.totalCount / this.limit)
      })
    }
  }
  SwitchPage(page: any) {
    this.currentPage = page
    if (this.searchvalue == "") {
      this.apiService.getClaims(this.limit, this.currentPage, this.sort).then((data: any) => {
        this.paging = Math.ceil(data.totalCount / this.limit)
        for (let i = 0; i < data.claims.length; i++) {
          this.apiService.getEmployeeByID(data.claims[i].userId).then((userData: any) => {
            data.claims[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data.claims[i].policyId).then((policyData: any) => {
            this.apiService.getCompanyByID(policyData.companyId).then((companyData: any) => {
              policyData.companyInfor = companyData
            })
            data.claims[i].policyInfor = policyData
          })
        }
        this.data = data.claims
      })
    } else {
      this.apiService.getSearchClaim(this.searchvalue, this.limit, this.currentPage, this.sort).then((data: any) => {
        this.data = data.employees
        for (let i = 0; i < data.claims.length; i++) {
          this.apiService.getEmployeeByID(data.claims[i].userId).then((userData: any) => {
            data.claims[i].userInfor = userData
          })
          this.apiService.getPolicyByID(data.claims[i].policyId).then((policyData: any) => {
            this.apiService.getCompanyByID(policyData.companyId).then((companyData: any) => {
              policyData.companyInfor = companyData
            })
            data.claims[i].policyInfor = policyData
          })
        }
        this.data = data.claims
        this.paging = Math.ceil(data.totalCount / this.limit)
      })
    }
  }
}
