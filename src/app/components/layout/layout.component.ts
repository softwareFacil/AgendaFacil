import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [ UserService ]
})
export class LayoutComponent implements OnInit {

  public identity;

  constructor(
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
  }

}
