//Moduloes
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModuleWithProviders } from '@angular/core';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { GooglePlaceModule } from 'ng2-google-place-autocomplete';
import { MatTableModule } from '@angular/material';
import { LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatInputModule, MatChipsModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import { MatTooltipModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

//Componenetes
import { APP_ROUTING } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { ListcategoryComponent } from './components/listcategory/listcategory.component';
import { AddeventsComponent } from './components/addevents/addevents.component';
import { ListeventsComponent } from './components/listevents/listevents.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AgmCoreModule } from '@agm/core';
import { RequestaccountComponent } from './components/requestaccount/requestaccount.component';
import { ViewComponent } from './components/view/view.component';
import { CategoryComponent } from './components/category/category.component';
import { EditComponent } from './components/edit/edit.component';
import { ListorgComponent } from './components/listorg/listorg.component';
import { EditorgComponent } from './components/editorg/editorg.component';
import { AddtypeorgComponent } from './components/addtypeorg/addtypeorg.component';

//Servicios
import { SearchPipe } from './pipes/search.pipes';
import { AdminGuard } from './services/admin.guard';
import { OrgGuard } from './services/org.guard';
import { LoginGuard } from './services/login.guard';
import { UserService } from './services/api-rest.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RequestComponent,
    AddcategoryComponent,
    ListcategoryComponent,
    AddeventsComponent,
    ListeventsComponent,
    LoginComponent,
    LayoutComponent,
    RequestaccountComponent,
    ViewComponent,
    CategoryComponent,
    EditComponent,
    ListorgComponent,
    EditorgComponent,
    SearchPipe,
    AddtypeorgComponent
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
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatTableModule,
    MatSnackBarModule,
    // GooglePlaceModule,
    APP_ROUTING
  ],
  // schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AdminGuard,
    OrgGuard,
    LoginGuard,
    UserService,
    { useClass: HashLocationStrategy, provide: LOCALE_ID, useValue: "es" }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
