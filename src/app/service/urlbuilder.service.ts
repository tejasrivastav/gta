import { Injectable } from '@angular/core';

@Injectable()
export class UrlbuilderService {

  constructor() { }

  baseUrl = window.location.protocol+"//"+window.location.host
  url = "";
  
  setEndpoint(endpoint){
    this.url = this.baseUrl+endpoint;
  }

  build(){
    let url = Object.assign("",this.url);
    this.url = "";
    return url;
  }
}
