import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
  public url: string;
  public identity;
  public token;
  public type;

  constructor(
    private _http: Http
  ){
    this.url = GLOBAL.url;
  }

  signup( user_to_login, gettoken = null ){
    if( gettoken != null ){
      user_to_login.gettoken = gettoken;
    }

    let params = JSON.stringify( user_to_login );
    let headers = new Headers({ 'Content-Type': 'application/json' });
    console.log(params)
    return this._http.post( this.url + '/login/', params, { headers:headers } )
                     .map( res => res.json() );
  }

  getIdentity(){
    let identity = JSON.parse( localStorage.getItem( 'identity' ) );

    if ( identity != 'undefined' ) {
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem( 'token' );

    if ( token != 'undefined' ) {
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  getType(){
    let type = localStorage.getItem( 'type' );

    if ( type != 'undefined' ) {
      this.type = type;
    }else{
      this.type = null;
    }
    return this.type;
  }

}
