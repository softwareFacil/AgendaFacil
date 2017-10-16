import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatInputModule } from '@angular/material';

import { APP_ROUTING } from './app.routing';
import { RequestComponent } from './components/request/request.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { ListcategoryComponent } from './components/listcategory/listcategory.component';
import { AddspaceComponent } from './components/addspace/addspace.component';
import { AddeventsComponent } from './components/addevents/addevents.component';
import { ListeventsComponent } from './components/listevents/listevents.component';
import { RequestspaceComponent } from './components/requestspace/requestspace.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RequestComponent,
    AddcategoryComponent,
    ListcategoryComponent,
    AddspaceComponent,
    AddeventsComponent,
    ListeventsComponent,
    RequestspaceComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    APP_ROUTING
  ],
  // schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
