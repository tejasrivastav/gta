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

const routes: Routes = [
  { path: '', component: BaseComponent },
  {
    path: 'exercise',
    loadChildren: 'app/exercise/exercise.module#ExerciseModule'
  },
  {
    path: 'resource',
    loadChildren: 'app/resources/resources.module#ResourcesModule'
  }
]

@NgModule({
  declarations: [
    BaseComponent
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
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
