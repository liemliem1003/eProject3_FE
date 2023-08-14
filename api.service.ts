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
        return this.http.get<any>('assets/regulations.json')
    }

    postCreateCompany(companyName: any, companyPhone: any, address: any, logo: any, url: any, status: any) {
        var api = `${this.apiUrl}/Company/create`
        var body = {
            companyName: companyName,
            companyPhone: companyPhone,
            address: address,
            logo: logo,
            url: url,
            status: status
        }
        var JSbody = JSON.stringify(body)
        return new Promise((resolve, reject) => {
            this.http.post(api, JSbody, this.httpOptions)
                .subscribe((data: any) => {
                    resolve(data);
                },
                    (error) => {
                        resolve(error);
                    })
        }).catch()
    }

    getLogin(username: any, password: any) {
        var api = `${this.apiUrl}/Users/login?username=${username}&password=${password}`;
        return this.http.get<any>(api).toPromise();
    }

    async getAllCompanies(limit?: number, page?: number, sortOrder?: string) {
        limit == undefined ? limit = 10 : true
        page == undefined ? page = 1 : true
        sortOrder == undefined ? sortOrder = "asc" : true
        var api = `${this.apiUrl}/Company?limit=${limit}&page=${page}&sortOrder=${sortOrder}`;
        return new Promise((resolve, reject) => {
            this.http.get<any>(api).subscribe((data: any) => {
                resolve(data);
            },
                (error) => {
                    resolve(error);
                }
            )
        }).catch()
    }

    getCompanyByID(id: any) {
        var api = `${this.apiUrl}/Company/${id}`;
        return this.http.get<any>(api).toPromise();
    }

    putUpdateCompany(id: any, companyName: any, companyPhone: any, address: any, logo: any, url: any, status: any) {
        var api = `${this.apiUrl}/Company/update/${id}`;
        var body = {
            companyId: id,
            companyName: companyName,
            companyPhone: companyPhone,
            address: address,
            logo: logo,
            url: url,
            status: status
        }
        var JSbody = JSON.stringify(body)
        return new Promise((resolve) => {
            this.http.put<any>(api, JSbody, this.httpOptions).subscribe((data: any) => {
                resolve(data);
            },
                (error) => {
                    resolve(error)
                }
            )
        }).catch()
    }
    postCreatePolicy(policyName: any, description: any, totalAmount: any, duration: any, companyId: any, banner: any, status: any) {
        var api = `${this.apiUrl}/Policy/create`
        var body = {
            policyName: policyName,
            desciption: description,
            totalAmount: totalAmount,
            duration: duration,
            companyId: companyId,
            banner: banner,
            status: status
        }

        var JSbody = JSON.stringify(body)
        return new Promise((resolve, reject) => {
            this.http.post(api, JSbody, this.httpOptions)
                .subscribe((data: any) => {
                    resolve(data);
                },
                    (error) => {
                        resolve(error)
                    })
        }).catch()
    }
    getAllPolicies(limit?: number, page?: number, sortOrder?: string) {
        limit == undefined ? limit = 10 : true
        page == undefined ? page = 1 : true
        sortOrder == undefined ? sortOrder = "asc" : true
        var api = `${this.apiUrl}/Policy?limit=${limit}&page=${page}&sortOrder=${sortOrder}`;
        return this.http.get<any>(api).toPromise();
    }
    getPolicyByID(id: any) {
        var api = `${this.apiUrl}/Policy/${id}`
        return this.http.get<any>(api).toPromise();
    }
    putUpdatePolicy(id:any,policyName: any, description: any, totalAmount: any, duration: any, companyId: any, banner: any, status: any){
        var api = `${this.apiUrl}/Policy/update/${id}`
        var body = {
            policyId: id,
            policyName: policyName,
            desciption: description,
            totalAmount: totalAmount,
            duration: duration,
            companyId: companyId,
            banner: banner,
            status: status
        }
        var JSbody = JSON.stringify(body)
        return new Promise((resolve) => {
            this.http.put<any>(api, JSbody, this.httpOptions).subscribe((data: any) => {
                resolve(data);
            },
                (error) => {
                    resolve(error)
                }
            )
        }).catch()
    }

    getEmployees(limit?: number, page?: number, sortOrder?: string) {
        limit == undefined ? limit = 10 : true
        page == undefined ? page = 1 : true
        sortOrder == undefined ? sortOrder = "asc" : true
        var api = `${this.apiUrl}/Users?limit=${limit}&page=${page}&sortOrder=${sortOrder}`;
        return new Promise((resolve, reject) => {
            this.http.get<any>(api).subscribe((data: any) => {
                resolve(data);
            },
                (error) => {
                    resolve(error);
                }
            )
        }).catch()
    }
    postCreateEmployee(username:any,password:any,name:any,dob:any,email:any,phone:any,address:any,avatar:any,role:any,status:any){
        var api = `${this.apiUrl}/Users/create`
        var body = {
            username: username,
            password: password,
            name: name,
            dob: dob,
            email: email,
            phone: phone,
            address: address,
            avatar:avatar,
            role:role,
            status:status
        }
        var JSbody = JSON.stringify(body)
        return new Promise((resolve, reject) => {
            this.http.post(api, JSbody, this.httpOptions)
                .subscribe((data: any) => {
                    resolve(data);
                },
                    (error) => {
                        resolve(error)
                    })
        }).catch()
    }
    getEmployeeByID(id: any) {
        var api = `${this.apiUrl}/Users/${id}`;
        return this.http.get<any>(api).toPromise();
    }
    putUpdateEmployee(id:any,username:any,password:any,name:any,dob:any,email:any,phone:any,address:any,avatar:any,role:any,status:any){
        var api = `${this.apiUrl}/Users/update/${id}`
        var body = {
            userId: id,
            username: username,
            password: password,
            name: name,
            dob: dob,
            email: email,
            phone: phone,
            address: address,
            avatar:avatar,
            role:role,
            status:status
        }
        var JSbody = JSON.stringify(body)
        return new Promise((resolve, reject) => {
            this.http.put<any>(api, JSbody, this.httpOptions).subscribe((data: any) => {
                resolve(data);
            },
                (error) => {
                    reject(error)
                }
            )
        }).catch()
    }
}