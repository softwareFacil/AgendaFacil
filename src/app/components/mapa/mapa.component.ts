import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/api-rest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public evento;
  public map;
  public _id;
  public img = 'http://agenda.publibarrio.cl:3789/api/get-img/';
  public icon = 'http://agenda.publibarrio.cl:3789/api/get-icon/';
  geocoder = new google.maps.Geocoder();


  constructor(
    private route: ActivatedRoute,
    private _userService: UserService
  ){
    this._id = route.snapshot.paramMap.get('id');
    this._userService.getEventsById( this._id ).subscribe( response => {
      this.evento = response.events;
      this.geocode();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.evento = params;
    });
  }

  ngAfterViewInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      heading: 90,
      tilt: 45,
      center: {lat: -35.675147, lng: -71.542969}
    });
  }

  geocode(){
    this.geocoder.geocode({'address':'chile'},(results, status)=>{
      if (status.toString() === 'OK') {
        this.map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

}
