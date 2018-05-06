import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  quote: any;
  content: any;
  constructor(
    private http: HttpClient,
    private baseService: BaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.baseService.getContent()
    .subscribe((data)=>{
      this.content=data
    })
  }

  startExercise(url){
    this.router.navigate([url]);
  }
}
