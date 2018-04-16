import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '../../../service/authenticate.service';
import { WofService } from '../wof.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  currentState = null;
  wof = {
    id: null,
    userId: null,
    blocks: [""],
    data: [[],[]]
  }
  
  data = [[{axis:"",value:0}],[]];
  user: any = {}
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticateService,
    private wofService: WofService
  ) { }

  ngOnInit() {
    this.authService.getUser()
    .subscribe((user: any)=>{
      this.user=user;
      this.wofService.retrieve(this.user.id)
      .subscribe((data: any)=>{
        this.init(data);
      })
    });
  }

  textUpdated(event,idx){
    console.log(event);
    this.wof.blocks[idx] = event.target.value;
  }

  save(){
    if(this.wof.data[0].length === 0){
      this.wof.data[0] = this.wof.blocks.map(block=> null);
    }
    if(this.wof.data[1].length === 0){
      this.wof.data[1] = this.wof.blocks.map(block=>null);
    }
    this.wofService.save(this.wof)
    .subscribe((wof: any)=>{
      if(wof.data[0].length === 0){
        wof.data[0] = wof.blocks.map(block=>null);
      }
      if(wof.data[1].length === 0){
        wof.data[1] = wof.blocks.map(block=>null);
      }
      this.wof = wof;
      this.init(this.wof);
    })
  }

  init(data){
    this.wof = Object.assign(this.wof,data);
    if(!this.wof.userId) {
      this.wof.userId = this.user.id
    }
    if(!this.wof.data) {
      this.wof.data = [[],[]];
    }
    let stage1 = this.wof.data[0].filter(val=>val!==null);
    let stage2 = this.wof.data[1].filter(val=>val!==null);
    if(this.wof.blocks.length === 0) {
      this.currentState = 0;
    } else if(stage1.length !== this.wof.blocks.length) {
      this.currentState = 1;
    } else if(stage2.length !== this.wof.blocks.length) {
      this.currentState = 3;
    }
    console.log(this.wof)
  }
}
