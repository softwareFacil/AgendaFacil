import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
  public url: string;
  public identity;
  public token;

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
    return this._http.post( this.url + '/login/', params, { headers:headers } )
                     .map( res => res.json() );
  }

  saveUser( user_save ){
    let params = JSON.stringify( user_save );
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post( this.url + '/register/', params, { headers:headers } )
                     .map( res => res.json() );
  }

  saveEvent( data_to_Event ){
    let params = JSON.stringify( data_to_Event );
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post( this.url + '/saveEvent/', params, { headers:headers } )
                     .map( res => res.json() );
  }

  saveImg( params, files, name ){
    return new Promise( function( resolve, reject ){
        var formData: any = new FormData();
        var xhr= new XMLHttpRequest();
        formData.append(name, files[0], files[0].name);

        xhr.onreadystatechange = function() {
          if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
              resolve( JSON.parse( xhr.response ) );
            }else{
              reject( xhr.response );
            }
          }
        }
        xhr.open( 'POST', 'http://agenda.publibarrio.cl:3789/api' + '/upload-img-event/' , true );
        xhr.send( formData );
    })
  }

  saveIcon( params, files, name ){
    return new Promise( function( resolve, reject ){
        var formData: any = new FormData();
        var xhr= new XMLHttpRequest();
        formData.append(name, files[0], files[0].name);

        xhr.onreadystatechange = function() {
          if ( xhr.readyState == 4 ) {
            if ( xhr.status == 200 ) {
              resolve( JSON.parse( xhr.response ) );
            }else{
              reject( xhr.response );
            }
          }
        }
        xhr.open( 'POST', 'http://agenda.publibarrio.cl:3789/api' + '/upload-img-user/' , true );
        xhr.send( formData );
    })
  }

  validateUser( user ){
    let params = JSON.stringify( user )
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http
               .put( this.url + '/validateUser/' + user._id, params, {headers: headers})
               .map( res => res.json() );
  }

  deleteUser( user ){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http
               .delete( this.url + '/removeUser/' + user._id, {headers: headers})
               .map(res => res.json());
  }

  getEvents(){
    return  this._http.get( this.url + '/events/' )
                      .map( res => res.json());
  }

  getEventsOf( org ){
    return  this._http.get( this.url + '/getEventsByOrg/' + org)
                      .map( res => res.json());
  }

  deleteEvent( event ){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http
               .delete( this.url + '/removeEvent/' + event._id, {headers: headers})
               .map(res => res.json());
  }

  getEventsImg(imageFile:String){
    return  this._http.get( this.url + '/get-img/' + imageFile )
                      .map( res => res.json());
  }

  getUser(){
    return  this._http.get( this.url + '/users/' )
                      .map( res => res.json());
  }

  getCategories(){
    return  this._http.get( this.url + '/getCategories/' )
                      .map( res => res.json());
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

}
