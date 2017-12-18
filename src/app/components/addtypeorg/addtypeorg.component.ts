import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { Types } from '../../models/models';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addtypeorg',
  templateUrl: './addtypeorg.component.html',
  styleUrls: ['./addtypeorg.component.css']
})
export class AddtypeorgComponent implements OnInit {

  public type: Types;

  constructor(
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) { this.type = new Types( '' ); }

  ngOnInit() {  }

  save(){
    console.log(this.type)
    this._userService.saveType( this.type ).subscribe( response => {
      this.snackBar.open(response.message, 'close', { duration: 2500 });
    });
  }

}
