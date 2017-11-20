import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Modulos
import { HomeComponent } from './components/home/home.component';
import { RequestComponent } from './components/request/request.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { AddeventsComponent } from './components/addevents/addevents.component';
import { ListcategoryComponent } from './components/listcategory/listcategory.component';
import { ListeventsComponent } from './components/listevents/listevents.component';
import { LoginComponent } from './components/login/login.component';
import { RequestaccountComponent } from './components/requestaccount/requestaccount.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ViewComponent } from './components/view/view.component';
import { CategoryComponent } from './components/category/category.component';
import { EditComponent } from './components/edit/edit.component';


const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'request', component: RequestComponent },
  { path: 'addcategory', component: AddcategoryComponent },
  { path: 'addevents', component: AddeventsComponent },
  { path: 'listcategory', component: ListcategoryComponent },
  { path: 'listevents', component: ListeventsComponent },
  { path: 'account', component: RequestaccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'view/:event', component: ViewComponent },
  { path: 'category/:category', component: CategoryComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '**', pathMatch: 'full', component: HomeComponent },
];


export const ROUTINGPROVIDERS: any[] = [];
export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, { useHash: true });
