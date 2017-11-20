import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { Router, ActivatedRoute } from '@angular/router';
=======
import { ActivatedRoute, Params, Router } from '@angular/router';
>>>>>>> c6d17e5328fb05cba58445b7208d6fa684b86d08
>>>>>>> a8dd48a018504cd0006ff19aa19aa9276dc73ef1


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
    private _apiService: UserService
  ) {  }

  ngOnInit() {
    this._apiService.getEvents().subscribe( response => { this.events = response.events.reverse();
      console.log(this.events)
    });
    this.identity = this._apiService.getIdentity();
  }
  ngDoCheck(){
    this.identity = this._apiService.getIdentity();
  }

<<<<<<< HEAD
=======
<<<<<<< HEAD
  edit(id){
    this._router.navigate([ 'edit/' + id ]);
  }
=======
>>>>>>> c6d17e5328fb05cba58445b7208d6fa684b86d08

>>>>>>> a8dd48a018504cd0006ff19aa19aa9276dc73ef1
}
