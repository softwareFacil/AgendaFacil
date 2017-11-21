import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [ UserService ]
})
export class CategoryComponent implements OnInit {

  public identity;
  public events = [];
  public img = 'http://agenda.publibarrio.cl:3789/api/get-img/';
  public icon = 'http://agenda.publibarrio.cl:3789/api/get-icon/';
  public type;

  constructor(
    private _apiService: UserService,
    private _activateRouter: ActivatedRoute,
    private _router: Router
  ) {
    this.type = _activateRouter.snapshot.paramMap.get('category')
  }

  ngOnInit() {
    this._apiService.getEventsByType( this.type ).subscribe( response => { this.events = response.events.reverse();
    });
    this.identity = this._apiService.getIdentity();
  }

  ngDoCheck(){
    this.identity = this._apiService.getIdentity();
  }

  edit(id){
    this._router.navigate([ 'edit/' + id ]);
  }

  descrip(evento) {
    this._router.navigate(['view/', evento]);
  }

}
