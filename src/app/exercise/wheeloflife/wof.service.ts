import { Injectable } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class WofService {

  constructor(
    private storageService: StorageService,
    private http: HttpClient
  ) { }

  save(obj){
    let token = this.storageService.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(token+":x"));
    if(!obj.id) {
      return this.http.post("http://localhost:5000/api/wheeloflife",obj,{"headers": headers})  
    } else {
      return this.http.put("http://localhost:5000/api/wheeloflife",obj,{"headers": headers})
    }
  }

  retrieve(userId){
    let token = this.storageService.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(token+":x"));
    return this.http.get("http://localhost:5000/api/wheeloflife",{headers: headers,params:{userId: userId}});
  }
}
