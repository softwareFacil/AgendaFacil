import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public evento:any;
  public map;
  public img = 'http://agenda.publibarrio.cl:3789/api/get-img/';
  public icon = 'http://agenda.publibarrio.cl:3789/api/get-icon/';
  geocoder = new google.maps.Geocoder();


  constructor(private route: ActivatedRoute){  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.evento = params;
      this.geocodeAddres(this.evento.ubicacion);
    });
  }

  ngAfterViewInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: -34.397, lng: 150.644}
    });
  }

  geocodeAddres(address){
    this.geocoder.geocode({'address':address},(results, status)=>{
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
