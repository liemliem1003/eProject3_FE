import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-policy',
  templateUrl: './show-policy.component.html',
  styleUrls: ['./show-policy.component.scss']
})
export class ShowPolicyComponent implements OnInit {
  policies:any
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getAllPolicies().then((data: any) => {
      this.policies=data.policies
    })
  }

}
