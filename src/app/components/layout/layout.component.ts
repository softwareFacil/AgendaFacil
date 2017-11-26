import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [ UserService ]
})
export class LayoutComponent implements OnInit {

  public identity;
  public icon = 'http://agenda.publibarrio.cl:3789/api/get-icon/';

  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate([ 'home' ]);
  }

  edit(id){
    this._router.navigate([ 'editorg/' + id ]);
  }
}
