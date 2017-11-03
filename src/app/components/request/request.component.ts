import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models';
import { UserService } from '../../services/api-rest.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  public data = [];

  constructor(
    private _apiService: UserService
  ) {
  }

  ngOnInit() {
    this._apiService.getUser().subscribe(
      response => {
        this.data = response.user;
      });
  }

  approve( userId ){
    this._apiService.validateUser( userId ).subscribe( response => { console.log(response) });
  }

  delete( userId ){
    this._apiService.deleteUser( userId ).subscribe( response => {  });
  }

}
