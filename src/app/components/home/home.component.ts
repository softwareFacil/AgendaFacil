import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
<<<<<<< HEAD
=======
import { Router, ActivatedRoute } from '@angular/router';


>>>>>>> c7da44314036a1b2139fe33d02d0edd773fd0052


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

  edit(id){
    this._router.navigate([ 'edit/' + id ]);
  }

>>>>>>> c7da44314036a1b2139fe33d02d0edd773fd0052
}
