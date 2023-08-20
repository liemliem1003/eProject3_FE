import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor() { }
  members: any=[
    {
      name:'Tho Che Quoc An',
      phone:'0902476690',
      email:'antcqts2203031@fpt.edu.vn',
      leader: true,
      role: 'Front-end',
      avatar:'assets/imgs/QuocAn.jpg'
    },{
      name:'Nguyen Tran Thanh Liem',
      phone:'0337697848',
      email:'LiemNTTTS2203014@fpt.edu.vn',
      role: 'Front-end',
      avatar:'assets/imgs/ThanhLiem.jpg'
    },{
      name:'Nguyen Mau Linh',
      phone:'0935476003',
      email:'LinhNMTS2006016@fpt.edu.vn',
      role: 'Back-end',
      avatar:'assets/imgs/QuocAn.jpg'
    },{
      name:'Pham Van Man',
      phone:'0961936996',
      email:'ManPVTS2203042@fpt.edu.vn',
      role: 'Back-end',
      avatar:'assets/imgs/QuocAn.jpg'
    },{
      name:'Hoang Anh Duc',
      phone:'0777413423',
      email:'DucHATS2010052@fpt.edu.vn',
      role: 'Back-end',
      avatar:'assets/imgs/QuocAn.jpg'
    }
  ]
  ngOnInit(): void {
  }

}
