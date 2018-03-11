import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  quote: Object;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.quote = 
    this.http.get("https://talaikis.com/api/quotes/random/")
    .subscribe(data=>{this.quote = data})
  }

}
