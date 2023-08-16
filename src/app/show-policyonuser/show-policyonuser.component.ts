import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-policyonuser',
  templateUrl: './show-policyonuser.component.html',
  styleUrls: ['./show-policyonuser.component.scss']
})
export class ShowPolicyonuserComponent implements OnInit {
  data:any
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getPolicyOnUser().then((data: any) => {
      
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
  // Date control
  ConvertDateToInput(inputDate: any) {
    inputDate = new Date(inputDate);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }

}
