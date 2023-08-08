import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api';
    constructor(private http: HttpClient) { }

    getJSON() {
        console.log(this.http.get<any>('assets/regulations.json'));
        
        return this.http.get<any>('assets/regulations.json')
    }

    getAllEmployees(limit:any,page:any,id:any,name:any,role:any,email:any) {
        var query = `${this.apiUrl}/employees?limit=${limit}&page=${page}`

        if(id!=undefined && id!=''){
            query+=`&employeeid=${id}`
        }
        if(name!=undefined && name!=''){
            query+=`&name=${name}`
        }
        if(role!=undefined && role!=''){
            query+=`&role=${role}`
        }
        if(email!=undefined && email!=''){
            query+=`&email=${email}`
        }
        
        return this.http.get(query)
    }

    getLogin(username: any, password: any) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.apiUrl}/employees/login?username=${username}&pass=${password}`)
                .subscribe((data: any) => {
                    resolve(data);
                },
                    (error) => {
                        reject(error);
                    })
        })
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

    putUpdateEmployee(id:any,name:any,email:any,role:any,status:any){
        return new Promise((resolve, reject) => {
            this.http.put(`${this.apiUrl}/employee/update?id=${id}&email=${email}&name=${name}&role=${role}&status=${status}`,{})
            .subscribe((data: any) => {
                resolve(data);
            },
                (error) => {
                    reject(error);
                })
        })
    }
}