import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UrlbuilderService {

  constructor() {
    if (environment.production) {
      this.baseUrl = 'https://ihqw8ga2cl.execute-api.ap-southeast-1.amazonaws.com/dev/api/';
    }  else {
      // this.baseUrl = window.location.protocol+"//"+window.location.host;
      // this.baseUrl = 'https://ihqw8ga2cl.execute-api.ap-southeast-1.amazonaws.com/dev/api/';
      this.baseUrl = "http://127.0.0.1:5000/api/"
    }
  }

  private baseUrl = window.location.protocol+"//"+window.location.host
  private url = "";
  
  setEndpoint(endpoint){
    this.url = this.baseUrl+endpoint;
    return this;
  }

  build(){
    let url = new String(this.url).toString();
    this.url = "";
    return url;
  }
}
