import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';

import { MaterialModule } from './/material.module';
import { LoginComponent } from './components/login/login.component';
import { AuthenticateService } from './service/authenticate.service';
import { UrlbuilderService } from './service/urlbuilder.service';
import { StorageService } from "./service/storage.service";
import { AuthenticatedGuard } from './authenticated.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    AuthenticateService,
    UrlbuilderService,
    StorageService,
    AuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
