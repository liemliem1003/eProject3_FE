import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-policy',
  templateUrl: './show-policy.component.html',
  styleUrls: ['./show-policy.component.scss']
})
export class ShowPolicyComponent implements OnInit {
  companies:any
  policies:any
  constructor(private apiService: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void>{
    await this.apiService.getAllCompanies().then((data: any) => {
      this.companies = data
      for (let i = 0; i < data.companies.length; i++) {
        this.companies[data.companies[i].companyId] = data.companies[i]
      }
    })
    this.apiService.getAllPolicies().then((data: any) => {
      this.policies=data.policies
      // this.data.company = this.companies[data.companyId]
      for (let i = 0; i < this.policies.length; i++) {
        this.policies[i].company = this.companies[this.policies[i].companyId]
      }
      console.log(this.policies);


      
    })
  }

}
