import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-claim',
  templateUrl: './show-claim.component.html',
  styleUrls: ['./show-claim.component.scss']
})
export class ShowClaimComponent implements OnInit {
  data:any
  constructor(private apiService: ApiService, private router: Router) { }
  
  ngOnInit(): void {
    this.apiService.getClaims().then((data: any) => {
      for (let i = 0; i < data.claims.length; i++) {
        this.apiService.getEmployeeByID(data.claims[i].userId).then((userData:any)=>{
          data.claims[i].userInfor = userData
        })
        this.apiService.getPolicyByID(data.claims[i].policyId).then((policyData:any)=>{
          this.apiService.getCompanyByID(policyData.companyId).then((companyData:any)=>{
            policyData.companyInfor = companyData
          })
          data.claims[i].policyInfor = policyData
        })
      }
      this.data = data.claims
      console.log(data);
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
}
