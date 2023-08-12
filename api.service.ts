import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) { }

    getJSON() {
        console.log(this.http.get<any>('assets/regulations.json'));

        return this.http.get<any>('assets/regulations.json')
    }

    postCreateCompany(companyName:any,companyPhone:any,address:any,logo:any,url:any,status:any){
        var api = `${this.apiUrl}/Company/create`
        var body ={
            companyName: companyName,
            companyPhone: companyPhone,
            address: address,
            logo: logo,
            url: url,
            status: status
          }
          var JSbody = JSON.stringify(body)
          console.log(JSbody);
          
        return new Promise((resolve, reject) => {
            this.http.post(api, JSbody, this.httpOptions)
                .subscribe((data: any) => {
                    resolve(data);
                },
                    (error) => {
                        reject(error);
                    })
        }) 
    }





    getLogin(username: any, password: any) {
        var api = `${this.apiUrl}/Users/login?username=${username}&password=${password}`;
        return this.http.get<any>(api).toPromise();
    }

    getEmployeeByID(id: any) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.apiUrl}/employees?id=${id}`)
                .subscribe((data: any) => {
                    resolve(data);
                },
                    (error) => {
                        reject(error);
                    })
        })
    }

//     putUpdateEmployee(id: any, name: any, email: any, role: any, status: any) {
//         return new Promise((resolve, reject) => {
//             this.http.put(`${this.apiUrl}/employee/update?id=${id}&email=${email}&name=${name}&role=${role}&status=${status}`, {})
//                 .subscribe((data: any) => {
//                     resolve(data);
//                 },
//                     (error) => {
//                         reject(error);
//                     })
//         })
//     }
}