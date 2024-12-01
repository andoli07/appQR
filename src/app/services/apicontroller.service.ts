import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicontrollerService {

  apiURL = "http://192.168.165.203:8000/api";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiURL}/accounts`);
  }

  postUser(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/accounts`, data);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiURL}/accounts/${id}/`, data);
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/accounts/${id}/`);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/accounts/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/accounts/register`, data);
  }
}
