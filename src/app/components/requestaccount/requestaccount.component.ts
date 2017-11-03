import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models';
import { UserService } from '../../services/api-rest.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-requestaccount',
  templateUrl: './requestaccount.component.html',
  styleUrls: ['./requestaccount.component.css'],
  providers: [ UserService ]
})
export class RequestaccountComponent implements OnInit {

  public user: User;
  public files;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.user = new User( '', '', '', '', '', 'ROLE_USER', '', '', '', false );
  }

  ngOnInit() {
  }

  onChange(event) {
    this.files = event.srcElement.files;
  }

  onSubmit( pass, repass ){
    if ( pass == repass ) {
        this.user.password = pass;
    }else{
      this.user.password = '';
    }
    if (this.files) {
      this._userService.saveIcon( [], this.files, 'image' )
          .then(( result: any ) => {
            this.user.foto = result.image;
            this._userService.saveUser( this.user ).subscribe(
              response => {
                if (response.user) {
                  console.log(response.message)
                  this.snackBar.open( response.message, 'close', { duration: 5000});
                }else{
                  this.snackBar.open( response.message, 'close', { duration: 5000});
                }
              });
           });
    }else{
      this.snackBar.open( 'Seleccione una imagen y/o complete los campos faltantes.', 'close', { duration: 5000});
    }
  }

}
