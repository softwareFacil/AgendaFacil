import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.css'],
  providers: [ UserService ]
})
export class DesignComponent implements OnInit {

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

  // edit(id){
  //   this._router.navigate([ 'editorg/' + id ]);
  // }

}
