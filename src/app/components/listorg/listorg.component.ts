import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { User } from '../../models/models';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-listorg',
  templateUrl: './listorg.component.html',
  styleUrls: ['./listorg.component.css']
})
export class ListorgComponent implements OnInit {

  public data = [];
  public user: User ;

  constructor(
    private _apiService: UserService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.user = new User( '', '', '', '', '', 'ROLE_USER', '', '', '', true );
    this.data = [new User( '', '', '', '', '', 'ROLE_USER', '', '', '', true )];
  }

  ngOnInit() {
    this._apiService.getAllUser().subscribe(
      response => {
        this.data = response.user;
      });
  }

  edit( id ){
    this._router.navigate([ 'editorg/' + id ]);
  }

  delete( user ){
    this._apiService.deleteUser( user ).subscribe( response => {
      this.snackBar.open( response.message, 'close', { duration: 2500});
    });
  }

}
