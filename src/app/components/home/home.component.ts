import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ UserService ]
})
export class HomeComponent implements OnInit {

  public identity;
  public events = [];
  public img = 'http://agenda.publibarrio.cl:3789/api/get-img/';
  public icon = 'http://agenda.publibarrio.cl:3789/api/get-icon/';

  constructor(
    private _apiService: UserService,
    private _router: Router
  ) {  }

  ngOnInit() {
    this._apiService.getEvents().subscribe( response => { this.events = response.events.reverse(); });
    this.identity = this._apiService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._apiService.getIdentity();
  }

  edit(id){
    this._router.navigate([ 'edit/' + id ]);
  }

  descrip(evento) {
    evento.lat = evento.ubicacion.lat;
    evento.long = evento.ubicacion.long;
    this._router.navigate(['view/', evento]);
  }

}
