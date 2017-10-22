import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/api-rest.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  providers: [ UserService ]
})
export class LoginComponent implements OnInit {
  public title: String;
  public user: User;
  public identity;
  public token;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = 'Identificate';
    this.user = new User( '', '', '', '', '', 'ROLE_ADMIN', '', '' );
  }

  ngOnInit() {
    console.log( 'login.component cargado!!!' );
  }

  onSubmit(){
    //Loguear al usuario y obtener el objeto
    console.log(this.user)

    this._userService.signup(this.user).subscribe(
      response => {
        this.identity = response.user;
        console.log(this.identity)
        if ( !this.identity || !this.identity._id ) {
          alert( 'El usuario no se ha logueado correctamente' );
        }else{
          this.identity.password = '';
          localStorage.setItem( 'identity', JSON.stringify( this.identity ) );

          //Obtener Token
          this._userService.signup( this.user, 'true' ).subscribe(
            response => {
              this.token = response.token;
              if ( this.token.length <= 0 ) {
                  alert( 'El token no se ha generado' );
              }else{
                localStorage.setItem( 'token', this.token );
                this.status = 'success';

                this._router.navigate([ '/type' ]);
              }
            },
            error => {
              console.log( <any>error );
            }
          );
        }
      },
      error => {
        var errorMessage = <any>error ;

        if ( errorMessage != null ) {
            var body = JSON.parse( error._body );
            this.status = 'error';
        }
      }
    );

  }

}
