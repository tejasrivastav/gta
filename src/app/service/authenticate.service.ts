import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticateService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  createAccount(obj){
    return this.http.post("http://localhost:5000/api/users",obj);
  }

  login(obj) {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(obj.username+":"+obj.password));
    return this.http.get("http://localhost:5000/api/token",{"headers": headers})
    .toPromise()
    .then((data:any) =>{
      this.storageService.setItem("token",data.token);
      return true;
    });
  }

  isAuthtentic(){
    let token = this.storageService.getItem("token");
    if(token && token !== "null" && token !== "undefined"){
      return true;
    } else {
      return false;
    }
  }

  getUser(){
    let token = this.storageService.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(token+":x"));
    return this.http.get("http://localhost:5000/api/user",{"headers": headers})
  }

}
