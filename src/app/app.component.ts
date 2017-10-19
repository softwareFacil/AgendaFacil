import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from './services/api-rest.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ UserService ]
})
export class AppComponent implements OnInit, DoCheck {
  public title:string;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router
  ){
    this.title = 'app';
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

}
