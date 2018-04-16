import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { 
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule
} from "@angular/material";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: []
})
export class MaterialModule { }
