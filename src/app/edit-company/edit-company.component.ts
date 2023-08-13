import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  companyID: any
  JSimg:any
  data:any
  Form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hotline: new FormControl(),
    address: new FormControl(),
    website: new FormControl(),
    status: new FormControl(),
    logo: new FormControl('', [Validators.required])
  })


  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.apiService.getCompanyByID(params['companyID']).then((data: any) => {
        this.data = data
        this.Form.controls.name = new FormControl(this.data?.companyName)
        this.Form.controls.logo = new FormControl(this.data?.logo)
        this.JSimg = this.data?.logo
      })
    })

    
  }
  
  UpdateCompany(name:any,hotline:any,address:any,website:any,status:any){
    name == ""? name = null : true
    this.Form.controls.name = new FormControl(name==""?null:name,[Validators.required])
    this.apiService.putUpdateCompany(
      this.data.companyId,
      name,
      hotline,
      address,
      this.JSimg,
      website,
      status
    ).then((data: any) => {
      if(data.error==null){
        alert(data.message)
        this.router.navigate(['/showcompany'])
      }else{
        alert(data.error.CompanyName)
      }
    })
  }
  Cancel(){
    if(window.confirm("Cancel?")){
      this.router.navigate(['/showcompany'])
    }
  }
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
