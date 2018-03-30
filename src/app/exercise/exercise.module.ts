import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { GraphService } from "./wheeloflife/graph.service";
import { Page1Component } from './wheeloflife/page1/page1.component';


@NgModule({
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    FormsModule
  ],
  declarations: [],
  providers: [
    GraphService
  ],
  exports: []
})
export class ExerciseModule { }
