import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";

import { WheeloflifeComponent } from "./wheeloflife/wheeloflife.component";

import { 
  MatStepperModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
} from  "@angular/material";
import { JournalingComponent } from './journaling/journaling.component';
import { Page1Component } from "./wheeloflife/page1/page1.component";

const routes: Routes = [
  { path: 'wheeloflife', 
    component: WheeloflifeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '1'
      },
      {
        path: '1',
        component: Page1Component
      }
    ]
  },
  { path: 'journaling', component: JournalingComponent }
];

@NgModule({
  declarations: [
    WheeloflifeComponent,
    JournalingComponent,
    Page1Component
  ],
  imports: [
    RouterModule.forChild(routes),
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    RouterModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class ExerciseRoutingModule { }
