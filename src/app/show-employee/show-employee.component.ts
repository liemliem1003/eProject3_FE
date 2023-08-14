import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.scss']
})
export class ShowEmployeeComponent implements OnInit {
  employees:any
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getEmployees().then((data: any) => {
      this.employees = data.employees
    })
  }

}
