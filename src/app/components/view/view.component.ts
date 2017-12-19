import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/api-rest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
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
      this.geocode(this.evento.ubicacion.lat,this.evento.ubicacion.long);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.evento = params;
    });
  }

  ngAfterViewInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: -34.397, lng: 150.644}
    });
  }

  geocode(lat,long){
    var input = lat+','+long;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    this.geocoder.geocode({'location':latlng},(results, status)=>{
      if (status.toString() === 'OK') {
        this.map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: this.map,
          position: latlng
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
