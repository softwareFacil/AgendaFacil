import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ UserService ]
})
export class HomeComponent implements OnInit {

  public events = [];

  constructor(
    private _apiService: UserService
  ) {  }

  ngOnInit() {
    this._apiService.getEvents().subscribe( response => { this.events = response.events; });
    console.log(this.events);
  }

}
