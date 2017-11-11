import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { Events } from '../../models/models';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-listevents',
  templateUrl: './listevents.component.html',
  styleUrls: ['./listevents.component.css']
})
export class ListeventsComponent implements OnInit {

  public identity;
  public data = [];

  constructor(
    private _apiService: UserService,
    private snackBar: MatSnackBar
  ) {
    // this.data = new Events('', '', '', { lat: 0, long: 0, nombre: '' }, '', '', '', '', '', '');
  }

  ngOnInit() {
    this.identity = this._apiService.getIdentity();
    this._apiService.getEventsOf( this.identity.name ).subscribe( response => { this.data = response.events; });
  }

  delete( event ){
    console.log('elimnar')
    this._apiService.deleteEvent( event ).subscribe( response => {
      this.snackBar.open( response.message, 'close', { duration: 2500});
    });
  }

}
