import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { 
  MatCardModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
} from "@angular/material";

import { BaseComponent } from "./components/base/base.component";
import { WheeloflifeComponent } from "./components/wheeloflife/wheeloflife.component";
import { GraphService } from "./components/wheeloflife/graph.service";

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'wheeloflife', component: WheeloflifeComponent }
];

@NgModule({
  declarations: [
    BaseComponent,
    WheeloflifeComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [ RouterModule ],
  providers: [
    GraphService
  ]
})
export class AppRoutingModule { }
