import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [ UserService ]
})
export class PerfilComponent implements OnInit {

  public icon = 'http://agenda.publibarrio.cl:3789/api/get-icon/';
  public identity;

  constructor(
    private _apiService: UserService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.identity = this._apiService.getIdentity();
  }

  edit(id){
    this._router.navigate([ 'editorg/' + id ]);
  }
}
