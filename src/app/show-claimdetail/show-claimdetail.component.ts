import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DecimalPipe } from '@angular/common';
import {FunctioninshowComponent} from '../functioninshow/functioninshow.component'


@Component({
  selector: 'app-show-claimdetail',
  templateUrl: './show-claimdetail.component.html',
  styleUrls: ['./show-claimdetail.component.scss']
})
export class ShowClaimdetailComponent implements OnInit {
  data: any
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.apiService.getClaimByID(params['claimid']).then((data: any) => {
        this.apiService.getEmployeeByID(data.userId).then((userData: any) => {
          data.userInfor = userData
        })
        this.apiService.getPolicyByID(data.policyId).then((policyData: any) => {
          this.apiService.getCompanyByID(policyData.companyId).then((companyData: any) => {
            policyData.companyInfor = companyData
          })
          data.policyInfor = policyData
        })
        data.createDate = this.ConvertDateToInput(data.createDate)
        this.data = data
        console.log(data);
      })
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
  Cancel(){
    if(window.confirm("Cancel?")){
      this.router.navigate(['/showclaim'])
    }
  }
}
