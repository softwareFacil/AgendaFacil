import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { AddeventsComponent } from './components/addevents/addevents.component';
import { AddspaceComponent } from './components/addspace/addspace.component';
import { ListcategoryComponent } from './components/listcategory/listcategory.component';
import { ListeventsComponent } from './components/listevents/listevents.component';
import { LoginComponent } from './components/login/login.component';
import { RequestspaceComponent } from './components/requestspace/requestspace.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'request', component: RequestComponent },
  { path: 'addcategory', component: AddcategoryComponent },
  { path: 'addevents', component: AddeventsComponent },
  { path: 'addspace', component: AddspaceComponent },
  { path: 'listcategory', component: ListcategoryComponent },
  { path: 'listevents', component: ListeventsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'requestspace', component: RequestspaceComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
