import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  login = localStorage.getItem("dataLogin")!=null?true:false;

  constructor() { }

  ngOnInit(): void {
  }
  Logout(){
    if(window.confirm("Logout?")){
      window.localStorage.clear()
      window.location.reload();
    }
  }

}
