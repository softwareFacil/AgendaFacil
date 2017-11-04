import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { User } from '../../models/models';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  public data = [];
  public user: User ;

  constructor(
    private _apiService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.user = new User( '', '', '', '', '', 'ROLE_USER', '', '', '', true );
    this.data = [new User( '', '', '', '', '', 'ROLE_USER', '', '', '', true )];
  }

  ngOnInit() {
    this._apiService.getUser().subscribe(
      response => {
        this.data = response.user;
      });
  }

  approve( user ){
    user.state = true;
    this._apiService.validateUser( user ).subscribe( response => {
      this.snackBar.open( response.message, 'close', { duration: 2500});
    });
  }

  delete( user ){
    this._apiService.deleteUser( user ).subscribe( response => {
      this.snackBar.open( response.message, 'close', { duration: 2500});
    });
  }

}
