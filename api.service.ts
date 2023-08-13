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
                        reject(error);
                    })
        })
    }

    getLogin(username: any, password: any) {
        var api = `${this.apiUrl}/Users/login?username=${username}&password=${password}`;
        return this.http.get<any>(api).toPromise();
    }

    getAllCompanies(limit?:number,page?:number,sortOrder?:string) {
        limit==undefined?limit=10:true
        page==undefined?page=1:true
        sortOrder==undefined?sortOrder="asc":true
        var api = `${this.apiUrl}/Company?limit=${limit}&page=${page}&sortOrder=${sortOrder}`;
        return this.http.get<any>(api).toPromise();
    }

    getCompanyByID(id: any) {
        var api = `${this.apiUrl}/Company/${id}`;
        return this.http.get<any>(api).toPromise();
    }

    putUpdateCompany(id: any, companyName: any, companyPhone: any, address: any, logo: any, url: any, status: any) {
        var api = `${this.apiUrl}/Company/update/${id}`;
        var body = {
            companyId:id,
            companyName: companyName,
            companyPhone: companyPhone,
            address: address,
            logo: logo,
            url: url,
            status: status
        }
        var JSbody = JSON.stringify(body)
        console.log(JSbody);
        console.log(logo);
        
        return this.http.put<any>(api,JSbody, this.httpOptions).toPromise();
    }
}