import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatInputModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';
import { FormControl } from '@angular/forms';


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
import { AgmCoreModule } from '@agm/core';

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
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDhkr1RB2_KNBYuWFzE61RT1w3I41KC0cI",
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    // GooglePlaceModule,
    APP_ROUTING
  ],
  // schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
