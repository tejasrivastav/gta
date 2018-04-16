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
import { LoginComponent } from "./components/login/login.component";
import { AuthenticatedGuard } from './authenticated.guard';
import { UserResolver } from './user.resolver';
const routes: Routes = [
  { path: '', component: BaseComponent, canActivate: [AuthenticatedGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'exercise',
    loadChildren: 'app/exercise/exercise.module#ExerciseModule',
    canActivate: [AuthenticatedGuard],
    resolve: {
      "user": UserResolver
    }
  },
  {
    path: 'resource',
    loadChildren: 'app/resources/resources.module#ResourcesModule',
    canActivate: [AuthenticatedGuard]
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
  exports: [ RouterModule ],
  providers: [UserResolver]
})
export class AppRoutingModule { }
