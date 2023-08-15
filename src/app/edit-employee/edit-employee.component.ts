import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  data:any
  JSimg:any
  Form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  })

  constructor(private route: ActivatedRoute,private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      
      this.apiService.getEmployeeByID(params['employeeID']).then((data: any) => {
        this.data = data
        this.Form.get('name')?.setValue(data.name);
        this.Form.get('username')?.setValue(data.username);
        this.Form.get('password')?.setValue(data.password);
        this.Form.get('email')?.setValue(data.email);
        this.Form.get('phone')?.setValue(data.phone);
        this.Form.get('address')?.setValue(data.address);
        this.Form.controls.avatar = new FormControl(data.avatar)
        this.Form.get('dob')?.setValue(data.dob.slice(0,10));
      })})

  }
  UpdateEmployee(){
    if(this.Form.status=="VALID"){
      if(window.confirm("Update?")){
        this.apiService.putUpdateEmployee(
          this.data.userId,
          this.Form.get('username')?.value,
          this.Form.get('password')?.value,
          this.Form.get('name')?.value,
          this.ConvertDate(this.Form.get('dob')?.value),
          this.Form.get('email')?.value,
          this.Form.get('phone')?.value,
          this.Form.get('address')?.value,
          this.Form.get('avatar')?.value,
          this.data.role,
        ).then((data: any) => {
          if(data.error==null){
            alert(data.message)
            this.router.navigate(['/showpolicies'])
          }else{
            alert(data.error.CompanyName)
          }
        })

      }
    }else{
      
    }
    
  }
  //
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
