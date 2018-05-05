import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '../../../service/authenticate.service';
import { WofService } from '../wof.service';

import * as d3 from 'd3';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";

import { GraphService } from "../graph.service";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  currentState = null;
  @ViewChild('radarChart1') private chartContainer1: ElementRef;
  @ViewChild('radarChart2') private chartContainer2: ElementRef;
  wof = {
    id: null,
    userId: null,
    blocks: [],
    data: [[],[]],
    version: 1,
    createdDate: null,
    status: "PENDING",
    currentState: 0
  }
  
  data = [[{axis:"",value:0}],[]];
  user: any = {}
  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticateService,
    private wofService: WofService,
    private graphService: GraphService
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
    this.wof.blocks[idx] = event.target.value;
  }

  save(){
    if(this.wof.blocks.length > 0 && this.currentState !== 0){
      if(this.wof.data[0].length === 0){
        this.wof.data[0] = this.wof.blocks.map(block=> null);
      }
      if(this.wof.data[1].length === 0){
        this.wof.data[1] = this.wof.blocks.map(block=>null);
      }
    } else {
      this.wof.data = null;
    }
    if(this.currentState === 3) {
      this.wof.status = "DONE";
    }
    this.wof.currentState++;
    this.wofService.save(this.wof)
    .subscribe((wof: any)=>{
      if(wof.data&&wof.data[0].length === 0){
        wof.data[0] = wof.blocks.map(block=>null);
      }
      if(wof.data&&wof.data[1].length === 0){
        wof.data[1] = wof.blocks.map(block=>null);
      }
      this.wof = wof;
      this.init(this.wof);
    })
  }

  init(data){
    document.getElementsByClassName("radarChart2").item(0).parentElement.style.display="none";
    document.getElementsByClassName("radarChart1").item(0).parentElement.style.display="none";
    this.wof = Object.assign(this.wof,data);
    if(!this.wof.userId) {
      this.wof.userId = this.user.id
    }
    if(!this.wof.data) {
      this.wof.data = [[],[]];
    }
    console.log(this.currentState);
    if(!this.wof.currentState){
      this.wof.currentState = 0
    }
    this.currentState = this.wof.currentState;
    switch (this.currentState) {
      case 0:
        if(this.wof.blocks.length === 0){
          this.wof.blocks.push("");
        }
        break;
      case 2:
        document.getElementsByClassName("radarChart1").item(0).parentElement.style.display="flex";
        this.phaseone(this.wof)
        break;
      case 4:
        document.getElementsByClassName("radarChart2").item(0).parentElement.style.display="flex";
        this.phasetwo(this.wof);
        break;
      default:
        break;
    }
    console.log(this.wof)
  }

  createChart = (chart,data) => {
    let hostElement;
    // Width & height
    if(chart===1){
      hostElement = this.chartContainer1.nativeElement;
    } else if(chart===2) {
      hostElement = this.chartContainer2.nativeElement;
    }
    let margin = { top: 50, right: 50, bottom: 50, left: 50};

    let width = hostElement.offsetWidth - margin.left - margin.right;
    let height = hostElement.offsetHeight - margin.top - margin.bottom;

    // Color
    var color = d3Scale.scaleOrdinal()
      .range(["#EDC951","#CC333F","#00A0B0"]);

    var radarChartOptions = {
      w: width,
      h: height,
      margin: margin,
      maxValue: 0.5,
      levels: 5,
      roundStrokes: true,
      color: color
    };
    this.graphService.render(".radarChart"+chart,data,radarChartOptions);
  }

  phaseone(wof){
    let transformedData = this.wofTransform(wof);
    let data = [[],[]];
    data[0] = transformedData[0].map(a => Object.assign({}, a));
    data[1] = [];
    let newData = data[0].map(a => Object.assign({}, a));
    transformedData[1] = newData;
    data[0] = data[0].map((point)=>{
      point.value = point.value/10;
      return point;
    })
    this.createChart(1,data)
  }

  phasetwo(wof){
    let transformedData = this.wofTransform(wof);
    let data = [[],[]];
    data[0] = transformedData[0].map(a => Object.assign({}, a));
    data[1] = transformedData[1].map(a => Object.assign({}, a));
    data[0] = data[0].map((point)=>{
      point.value = point.value/10;
      return point;
    })
    data[1] = data[1].map((point)=>{
      point.value = point.value/10;
      return point;
    })
    this.createChart(2,data)
  }

  wofTransform(wof){
    let data = [[],[]]
    data[0] = wof.blocks.map((value,idx)=>{
      return {axis: value,value: wof.data[0][idx]}
    });
    data[1] = wof.blocks.map((value,idx)=>{
      return {axis: value,value: wof.data[1][idx]}
    });
    return data;
  }

  back(){
    try {
      if((this.currentState%2) === 0){
        document.getElementsByClassName("radarChart2").item(0).parentElement.style.display="none";
        document.getElementsByClassName("radarChart1").item(0).parentElement.style.display="none";
      } else {
        // document.getElementsByClassName("radarChart2").item(0).parentElement.style.display="flex";
        // document.getElementsByClassName("radarChart1").item(0).parentElement.style.display="flex";
        if(this.currentState === 3) {
          document.getElementsByClassName("radarChart1").item(0).parentElement.style.display="flex";
          // setTimeout(function(){
          //   this.phaseone(this.wof);
          // },100);
        }
      }
    } catch {}
    this.wof.currentState--;
    this.init(this.wof);
  }

  revise(){
    let wof = this.wof;
    wof.id = null;
    wof.data = [[],[]];
    wof.createdDate = null;
    wof.version++;
    wof.currentState=0;
    wof.status = "PENDING";
    this.wof = wof;
    this.save();
  }
}
