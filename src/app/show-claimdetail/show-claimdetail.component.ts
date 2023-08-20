import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service'
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { DecimalPipe } from '@angular/common';
import { FunctioninshowComponent } from '../functioninshow/functioninshow.component'


@Component({
  selector: 'app-show-claimdetail',
  templateUrl: './show-claimdetail.component.html',
  styleUrls: ['./show-claimdetail.component.scss']
})
export class ShowClaimdetailComponent implements OnInit {
  loginUserData: any = JSON.parse(localStorage.getItem("dataLogin") || "{}")
  data: any
  listCurrentImgs: any = []
  listImgClaim: any = []
  JSimg: any
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.apiService.getClaimByID(params['claimid']).then((data: any) => {
        this.apiService.getEmployeeByID(data.userId).then((userData: any) => {
          data.userInfor = userData
        })
        this.apiService.getPolicyByID(data.policyId).then((policyData: any) => {
          this.apiService.getCompanyByID(policyData.companyId).then((companyData: any) => {
            policyData.companyInfor = companyData
          })
          data.policyInfor = policyData
        })
        data.createDate = this.ConvertDateToInput(data.createDate)
        this.data = data
        this.apiService.getLoadIamgeByClaimID(data.claimId).then((imgs) => {
          this.listCurrentImgs = imgs;
        })
      })
    })
  }
  async UpdateClaim() {
    if (this.listImgClaim.length != 0) {
      if (window.confirm("Update?")) {
        for (let i = 0; i < this.listImgClaim.length; i++) {
          var img = this.listImgClaim[i].split(",");
          img = img[1]
          await this.apiService.postUploadImgForClaim(this.data.claimId, img).then((data: any) => {
          })
        }
        alert("Update successfully")
        this.router.navigate(['/showclaim'])
      }
    } else {
      alert("Nothing change!!!")
    }
  }
  ApproveClaim() {
    if (window.confirm("Approve?")) {
      this.apiService.postApproveClaim(this.data.claimId).then((data: any) => {
        if (data.status = 405) {
          alert("Amount is not allowed")
        } else {
          alert("Success")
          this.router.navigate(['/showclaim'])
        }
      })
    }

  }
  //Date control
  ConvertDateToInput(inputDate: any) {
    inputDate = new Date(inputDate);
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }
  Cancel() {
    if (window.confirm("Cancel?")) {
      this.router.navigate(['/showclaim'])
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
    this.listImgClaim[this.listImgClaim.length] = data
    data = data.split(",")
    this.JSimg = data[1]
  }
  RemoveImg(id: any, upload: any) {
    if (window.confirm("Remove?")) {
      this.listImgClaim.splice(id, 1)
      upload.value = ""
    }
  }
}
