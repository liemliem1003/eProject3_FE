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
  Form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required])
  })
  JSimg: any
  constructor(private apiService: ApiService, private router: Router) {

  }

  ngOnInit(): void {

  }
  CreateUser(username: any, password: any, name: any, dob: any, email: any, phone: any, address: any, status: any) {
    console.log(this.Form);

    if (this.Form.status == "VALID") {
      this.apiService.postCreateEmployee(
        username,
        password,
        name,
        this.ConvertDate(dob),
        email,
        phone,
        address,
        this.JSimg,
        2,
        status
      ).then((data: any) => {
        console.log(data);
        if (data.error==null) {
          alert("Created")
          this.router.navigate(['/showemployee'])
        }else{
          alert(data.error[""])
        }
      })
    }

  }
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
  Cancel() {
    if (window.confirm("Cancel?")) {
      this.router.navigate(['/showemployees'])
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
