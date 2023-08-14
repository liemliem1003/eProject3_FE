import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.scss']
})
export class AddPolicyComponent implements OnInit {
  JSimg:any
  companies:any = []
  amountOption:any=[
    100000000,
    200000000,
    500000000,
    1000000000
  ]
  durationOption:any =[
    6,
    12,
    24
  ]
  Form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hotline: new FormControl(),
    description: new FormControl('', [Validators.required]),
    amount: new FormControl(),
    website: new FormControl(),
    status: new FormControl(),
    banner: new FormControl('', [Validators.required])
  })

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getAllCompanies().then((data: any) => {
      for (let i = 0; i < data.companies.length; i++) {
        data.companies[i].status == true ? this.companies[this.companies.length] =  data.companies[i] : false
      }
    })
  }
  CreatePolicy(policyName:any,description:any,totalAmount:any,duration:any,companyId:any,status:any){
    if (this.Form.status == "VALID") {
      if (window.confirm("Confirm to Create new Policy")) {
        this.apiService.postCreatePolicy(
          policyName,
          description,
          totalAmount,
          duration*30,
          companyId,
          this.JSimg,
          status
        ).then((data: any) => {
          if (data.error==null) {
            alert("Created")
            this.router.navigate(['/showpolicy'])
          }else{
            alert(data.error[""])
          }
        })
      }
    }
    return false
  }
  Cancel(){
    if(window.confirm("Cancel?")){
      this.router.navigate(['/showpolycies'])
    }
  }
  //cover file to base64
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
  //end
}
