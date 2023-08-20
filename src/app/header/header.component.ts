import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { ApiService } from '../../../api.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  login = localStorage.getItem("dataLogin")!==null;
  logindetail = JSON.parse(localStorage.getItem("dataLogin") || "{}")
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    if (this.logindetail.userId == undefined && this.login) {
      this.apiService.getEmployeeByID(this.logindetail.user.userId).then((data: any) => {
        this.logindetail = data
        console.log(data);
      })
    }
  }
  Logout() {
    if (window.confirm("Logout?")) {
      window.localStorage.clear()
      window.location.reload();
    }
  }

}
