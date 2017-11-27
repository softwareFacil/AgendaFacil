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
<<<<<<< HEAD
      this.geocodeAddres(this.evento.ubicacion);
=======
      this.geocode(this.evento);
>>>>>>> 49cb339fdeacfdf9de26274194e2bab6e293ce98
    });
  }

  ngAfterViewInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
    });
  }

  geocode(latlong){
    var input = latlong.lat+','+latlong.long;
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
