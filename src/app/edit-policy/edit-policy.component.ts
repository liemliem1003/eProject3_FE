import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DecimalPipe } from '@angular/common';
@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.scss']
})
export class EditPolicyComponent implements OnInit {
  data:any
  JSimg:any
  companies:any
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

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.apiService.getAllCompanies().then((data: any) => {
      this.companies = data
      for (let i = 0; i < data.companies.length; i++) {
        this.companies[data.companies[i].companyId] = data.companies[i]
      }
    })
    this.route.queryParams.subscribe(params => {
      this.apiService.getPolicyByID(params['policyID']).then((data: any) => {
        this.data = data
        this.Form.get('name')?.setValue(this.data?.policyName);
        this.Form.get('description')?.setValue(this.data?.desciption);
        this.data.company = this.companies[data.companyId]
        this.Form.controls.description = new FormControl()
        this.Form.controls.banner = new FormControl(this.data?.banner)
        this.JSimg = this.data?.banner
      })
    })
  }

  Update(policyName:any,description:any,totalAmount:any,duration:any,companyId:any,status:any){
    this.Form.controls.name = new FormControl(policyName==""?null:policyName,[Validators.required])
    this.Form.controls.description = new FormControl(description==""?null:description,[Validators.required])
    if (this.Form.status == "VALID") {
      if(window.confirm("Update?")){
        this.apiService.putUpdatePolicy(
          this.data.policyId,
          policyName,
          description,
          this.data.totalAmount,
          this.data.duration,
          this.data.companyId,
          this.JSimg,
          status
        ).then((data: any) => {
          if(data.error==null){
            alert(data.message)
            this.router.navigate(['/showpolicies'])
          }else{
            alert(data.error.CompanyName)
          }
        })
      }
    }
    
  }
  Cancel(){
    if(window.confirm("Cancel?")){
      this.router.navigate(['/showpolicies'])
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
