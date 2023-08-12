import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  dataJS_color: any;
  data: any;
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {

  }
  Login(username: any, password: any) {
    if (username == '') {
      alert("Username cannot be blank")
    } else if (password == '') {
      alert("Password cannot be blank")
    } else {
      this.apiService.getLogin(username, password).then((data: any) => {
        if (data!=null) {
          this.data = data;
          data = JSON.stringify(data);
          localStorage.setItem("dataLogin", data);
          this.router.navigate(['/showcompany'])
        }else{
          alert("Username or Password is incorrect!!!")
        }
      })
    }
    return false
  }
}
