import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-add-policyonuser',
  templateUrl: './add-policyonuser.component.html',
  styleUrls: ['./add-policyonuser.component.scss']
})
export class AddPolicyonuserComponent implements OnInit {
  Form = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    selectedPolicy: new FormControl(0)
  })
  JSimg: any
  userData: any
  availablePolicy: any
  totalAmount: any

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.apiService.getEmployeeByID(params['employeeID']).then((data: any) => {
        this.userData = data
      })
    })
    this.apiService.getAllActivePolicy().then((data: any) => {
      this.availablePolicy = data
      this.Form.get('selectedPolicy')?.setValue(0);
      this.totalAmount = this.availablePolicy[Number(this.Form.controls.selectedPolicy.value)].totalAmount
    })
  }
  AddPolicyToUser() {
    if (this.Form.status == "VALID") {
      if (confirm("Add Policy to User")) {
        this.apiService.postCreatePolicyOnUser(
          this.availablePolicy[Number(this.Form.controls.selectedPolicy.value)].policyId,
          this.userData.userId,
          this.Form.controls.startDate.value,
          this.Form.controls.endDate.value,
          this.availablePolicy[Number(this.Form.controls.selectedPolicy.value)].totalAmount
        ).then((data: any) => {
          console.log(data);
          if (data.avaibleAmount != 0 && data.avaibleAmount != undefined) {
            alert("Success")
            this.router.navigate(['/showemployee'])
          } else {
            alert("Failed")
          }
        })
      }
    }

  }
  // date control
  ConvertDate(inputDate: any) {
    const dateParts = inputDate.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);
    date.setHours(12);
    date.setMinutes(22);
    date.setSeconds(35);
    date.setMilliseconds(346);
    return date.toISOString();
  }
  ConvertDateToInput(inputDate: any) {
    inputDate = new Date(inputDate);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }
  CalculateEndDate(startDate: any) {
    this.totalAmount = this.availablePolicy[Number(this.Form.controls.selectedPolicy.value)].totalAmount
    if (startDate != "") {
      const currentDate = new Date(startDate);
      const daysToAdd = this.availablePolicy[this.Form?.controls?.selectedPolicy?.value || 0].duration;
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      const formattedDate = currentDate.toISOString().substr(0, 10);
      this.Form.get('endDate')?.setValue(formattedDate);
    }

  }
  Cancel() {
    if (window.confirm("Cancel?")) {
      this.router.navigate(['/showemployee'])
    }
  }
}
