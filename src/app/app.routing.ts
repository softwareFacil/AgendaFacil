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
import { EditorgComponent } from './components/editorg/editorg.component';
import { ListorgComponent } from './components/listorg/listorg.component';
import { AddtypeorgComponent } from './components/addtypeorg/addtypeorg.component';

//services
import { AdminGuard } from './services/admin.guard';
import { OrgGuard } from './services/org.guard';
import { LoginGuard } from './services/login.guard';

const APP_ROUTES: Routes = [
  //Principal
  { path: 'home', component: HomeComponent},
  { path: 'listcategory', component: ListcategoryComponent },
  //admin
  { path: 'addcategory', canActivate: [AdminGuard], component: AddcategoryComponent },
  { path: 'newtype', canActivate: [AdminGuard], component: AddtypeorgComponent },
  { path: 'request', canActivate: [AdminGuard], component: RequestComponent },
  { path: 'listorg', canActivate: [AdminGuard], component: ListorgComponent },
  { path: 'editorg/:id', canActivate: [AdminGuard], component: EditorgComponent },
  //org
  { path: 'addevents', canActivate: [OrgGuard], component: AddeventsComponent },
  { path: 'listevents', canActivate: [OrgGuard], component: ListeventsComponent },
  { path: 'edit/:id', canActivate: [OrgGuard], component: EditComponent },
  //normal
  { path: 'account', canActivate: [LoginGuard], component: RequestaccountComponent },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'category/:category', component: CategoryComponent },
  //Global
  { path: '**', pathMatch: 'full', component: HomeComponent },
];


export const ROUTINGPROVIDERS: any[] = [];
export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, { useHash: true });
