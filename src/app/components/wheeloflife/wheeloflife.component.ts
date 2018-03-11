import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, AfterViewChecked } from '@angular/core';

import * as d3 from 'd3';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";

import { GraphService } from "./graph.service";

@Component({
  selector: 'app-wheeloflife',
  templateUrl: './wheeloflife.component.html',
  styleUrls: ['./wheeloflife.component.scss']
})
export class WheeloflifeComponent implements OnInit, OnChanges {
    @ViewChild('radarChart1') private chartContainer1: ElementRef;
    @ViewChild('radarChart2') private chartContainer2: ElementRef;
    // @Input() data: Array<any> = [
    //   [//iPhone
    //   {axis:"Business, Career & Studies",value:0.22},
    //   {axis:"Finance & Wealth",value:0.28},
    //   {axis:"Health & Fitness",value:0.29},
    //   {axis:"Social & Friends",value:0.17},
    //   {axis:"Family",value:0.22},
    //   {axis:"Love",value:0.02},
    //   {axis:"Recreation & Fun",value:0.21},
    //   {axis:"Contribution",value:0.50},
    //   {axis:"Personal Growth",value:0.50}			
    //   ],[//Samsung
    //   {axis:"Business, Career & Studies",value:0.27},
    //   {axis:"Finance & Wealth",value:0.16},
    //   {axis:"Health & Fitness",value:0.35},
    //   {axis:"Social & Friends",value:0.13},
    //   {axis:"Family",value:0.20},
    //   {axis:"Love",value:0.13},
    //   {axis:"Recreation & Fun",value:0.35},
    //   {axis:"Contribution",value:0.38},
    //   {axis:"Personal Growth",value:0.38}
    //   ],[//Nokia Smartphone
    //   {axis:"Business, Career & Studies",value:0.26},
    //   {axis:"Finance & Wealth",value:0.10},
    //   {axis:"Health & Fitness",value:0.30},
    //   {axis:"Social & Friends",value:0.14},
    //   {axis:"Family",value:0.22},
    //   {axis:"Love",value:0.04},
    //   {axis:"Recreation & Fun",value:0.41},
    //   {axis:"Contribution",value:0.30},
    //   {axis:"Personal Growth",value:0.30}
    //   ]
    // ];
    data = [[],[]];
    @Input() class: string = "radarChart";
    
    node: any;
  
    hostElement: any;
  
    margin: any;
    width: any;
    height: any;
    hostElementHeight: number;
  
    color: any;
  
    svg: any;
    simulation: any;
    sensors: any;
  
    smallCircleRadius = 6;
    largeCircleRadius = 50;
  
    status: string;
  
    constructor(
      private elementRef: ElementRef,
      private graphService: GraphService
    ) {}
  
    
    ngOnInit() {
      // this.createChart();
      this.addSpoke(this.data[0]);
      // this.addSpoke(this.data[1]);
    }
  
    ngOnChanges() {
      if (this.data.length > 0 && this.svg) {
        
      }
    }
  
    createChart = (chart,data) => {
      // Width & height
      if(chart===1){
        this.hostElement = this.chartContainer1.nativeElement;
      } else if(chart===2) {
        this.hostElement = this.chartContainer2.nativeElement;
      }
      this.margin = { top: 50, right: 50, bottom: 50, left: 50};
  
      this.width = this.hostElement.offsetWidth - this.margin.left - this.margin.right;
      this.height = this.hostElement.offsetHeight - this.margin.top - this.margin.bottom;
  
      // Color
      var color = d3Scale.scaleOrdinal()
				.range(["#EDC951","#CC333F","#00A0B0"]);
  
        var radarChartOptions = {
          w: this.width,
          h: this.height,
          margin: this.margin,
          maxValue: 0.5,
          levels: 5,
          roundStrokes: true,
          color: color
        };
        this.graphService.render("."+this.class+chart,data,radarChartOptions);
    }

    addSpoke(arr: Array<any>){
      arr.push({axis:"",value:0})
    }

    removeSpoke(arr: Array<any>, index: number){
      arr.splice(index,1);
    }

    phaseone(){
      let data = [[],[]];
      data[0] = this.data[0].map(a => Object.assign({}, a));
      data[1] = [];
      let newData = data[0].map(a => Object.assign({}, a));
      this.data[1] = newData;
      data[0] = data[0].map((point)=>{
        point.value = point.value/10;
        return point;
      })
      this.createChart(1,data)
    }

    phasetwo(){
      let data = [[],[]];
      data[0] = this.data[0].map(a => Object.assign({}, a));
      data[1] = this.data[1].map(a => Object.assign({}, a));
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
  }
