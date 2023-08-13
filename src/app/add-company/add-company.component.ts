import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  Form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hotline: new FormControl(),
    address: new FormControl(),
    website: new FormControl(),
    status: new FormControl(),
    logo: new FormControl('', [Validators.required])
  })
  JSimg: any

  constructor(private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    // this.apiService.postCreateCompany()
  }
  CreateCompany(companyName: any, companyPhone: any, address: any, url: any, status: any) {

    if (this.Form.status == "VALID") {
      if (window.confirm("Confirm to Create new Company")) {
        this.apiService.postCreateCompany(companyName, companyPhone, address, this.JSimg, url, status).then((data: any) => {
          if (data != null) {
            alert("Created")
            this.router.navigate(['/showcompany'])

          }

        })
      }
    }else{
      alert("Please input correct information")
    }
    return false
  }

  Cancel(){
    if(window.confirm("Cancel?")){
      this.router.navigate(['/showcompany'])
    }
  }

//
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
