import { Injectable } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlbuilderService } from '../../service/urlbuilder.service';

@Injectable()
export class WofService {

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private urlbuilder: UrlbuilderService
  ) { }

  save(obj){
    let url  = this.urlbuilder
            .setEndpoint("wheeloflife")
            .build()
    let token = this.storageService.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(token+":x"));
    if(!obj.id) {
      return this.http.post(url,obj,{"headers": headers})  
    } else {
      return this.http.put(url,obj,{"headers": headers})
    }
  }

  retrieve(userId){
    let url  = this.urlbuilder
            .setEndpoint("wheeloflife")
            .build()
    let token = this.storageService.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(token+":x"));
    return this.http.get(url,{headers: headers,params:{userId: userId}});
  }
}
