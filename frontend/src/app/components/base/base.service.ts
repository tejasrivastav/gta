import { Injectable } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UrlbuilderService } from '../../service/urlbuilder.service';

@Injectable()
export class BaseService {

  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private urlbuilder: UrlbuilderService
  ) { }

  getContent(){
    let url  = this.urlbuilder
            .setEndpoint("content")
            .build()
    let token = this.storageService.getItem("token");
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic "+btoa(token+":x"));
    return this.http.get(url,{"headers": headers})
  }
}
