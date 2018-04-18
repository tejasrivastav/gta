import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { StorageService } from './storage.service';
import { UrlbuilderService } from './urlbuilder.service';

@Injectable()
export class AuthenticateService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private urlbuilder: UrlbuilderService
  ) { }

  createAccount(obj){
    let url  = this.urlbuilder
              .setEndpoint("users")
              .build()
    return this.http.post(url,obj);
  }

  login(obj) {
    let url  = this.urlbuilder
              .setEndpoint("token")
              .build()
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(obj.username+":"+obj.password));
    return this.http.get(url,{"headers": headers})
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
    let url  = this.urlbuilder
            .setEndpoint("user")
            .build()
    let token = this.storageService.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(token+":x"));
    return this.http.get(url,{"headers": headers})
  }

}
