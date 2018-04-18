import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  setItem(key,value){
    window.localStorage.setItem(key,value);
  }

  getItem(key){
    return window.localStorage.getItem(key);
  }
}
