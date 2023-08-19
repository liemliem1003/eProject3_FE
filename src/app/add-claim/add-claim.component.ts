import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.scss']
})
export class AddClaimComponent implements OnInit {
  JSimg: any
  policyOnUserData: any
  Form = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    availableAmount: new FormControl(),
    appAmount: new FormControl(),
    policyName: new FormControl(),
    insurer: new FormControl(),
    description: new FormControl('', [Validators.required])
  })
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.apiService.getPolicyOnUserID(params['policyonuserId']).then(async (data: any) => {
        await this.apiService.getEmployeeByID(data.userId).then((userInfor: any) => {
          data.userInfor = userInfor
        })
        await this.apiService.getPolicyByID(data.policyId).then(async (policyId: any) => {
          data.policyInfor = policyId
          await this.apiService.getCompanyByID(data.policyInfor.companyId).then((companyInfor: any) => {
            data.policyInfor.companyInfor = companyInfor
          })
        })
        this.Form.get('name')?.setValue(data.userInfor.name);
        this.Form.get('phone')?.setValue(data.userInfor.phone);
        this.Form.get('email')?.setValue(data.userInfor.email);
        this.Form.get('policyName')?.setValue(data.policyInfor.policyName);
        this.Form.get('insurer')?.setValue(data.policyInfor.companyInfor.companyName);
        console.log(data);
        this.policyOnUserData = data
      })

    })
  }
  Create() {
    if (this.Form.status == "VALID") {
      if (window.confirm("Confirm to Create new Company")) {
        this.apiService.postCreateClaim(
          this.Form.controls.description.value,
          new Date().toISOString(),
          this.policyOnUserData.userInfor.userId,
          this.Form.controls.appAmount.value,
          this.policyOnUserData.policyInfor.policyId
        )
      }
    }

  }
  Cancel() {
    if (window.confirm("Cancel?")) {
      this.router.navigate(['/showcompany'])
    }
  }
  //image control
  handleImageInput(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.convertImageToBase64(selectedFile);
    }
  }

  async convertImageToBase64(file: File) {
    const base64String = await this.readFileAsBase64(file);
    this.processBase64Data(base64String);
  }

  readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const base64String = event.target.result;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  processBase64Data(data: any) {
    data = data.split(",")
    this.JSimg = data[1]
  }
}
