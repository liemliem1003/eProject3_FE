import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
  }
  Cancel(){
    if(window.confirm("Cancel?")){
      this.router.navigate(['/showemployees'])
    }
  }
}
