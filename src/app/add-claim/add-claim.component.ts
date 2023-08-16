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
  JSimg:any
  policyOnUserData:any
  Form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    hotline: new FormControl(),
    address: new FormControl(),
    website: new FormControl(),
    status: new FormControl(),
    logo: new FormControl('', [Validators.required])
  })
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.apiService.getEmployeeByID(params['policyonuserId']).then((data: any) => {
        this.policyOnUserData = data
      console.log(data);

      })
      
    })
  }
  Cancel(){
    if(window.confirm("Cancel?")){
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
