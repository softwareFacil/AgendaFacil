import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Events } from '../../models/models';
import { UserService } from '../../services/api-rest.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addevents',
  templateUrl: './addevents.component.html',
  styleUrls: ['./addevents.component.css'],
  providers: [ UserService ]
})
export class AddeventsComponent implements OnInit {

    public latitude: number;
    public longitude: number;
    public latitudeMark: number;
    public longitudeMark: number;
    public searchControl: FormControl;
    public zoom: number;
    public event: Events;
    public identity;
    public Fecha:Date;
    public act;
    public status: string;
    public files;
    stateCtrl: FormControl;
    filteredStates: Observable<any[]>;

    states: any[] = [
      {
        name: 'ACTO',
      },
      {
        name: 'AUDICION',
      },
      {
        name: 'BAILE',
      },
      {
        name: 'BICICLETADA',
      },
      {
        name: 'CAMPEONATO',
      },
      {
        name: 'CAPACITACIÓN',
      },
      {
        name: 'CARRERA ATLETICA',
      },
      {
        name: 'CHARLA',
      },
      {
        name: 'CIRCO',
      },
      {
        name: 'CIRCUITO DEPORTIVO',
      },
      {
        name: 'CONCIERTO',
      },
      {
        name: 'CONFERENCIA',
      },
      {
        name: 'CONGRESO',
      },
      {
        name: 'CORO',
      },
      {
        name: 'ORQUESTA',
      },
      {
        name: 'CULTURA COMUNITARIA',
      },
      {
        name: 'CURSO',
      },
      {
        name: 'DANZA',
      },
      {
        name: 'DEGUSTACIÓN',
      },
      {
        name: 'DIÁLOGO',
      },
      {
        name: 'ELECCIONES VECINALES',
      },
      {
        name: 'ENCUENTRO',
      },
      {
        name: 'EXHIBICIÓN',
      },
      {
        name: 'EXPOSICIÓN',
      },
      {
        name: 'FERIA',
      },
      {
        name: 'FESTIVAL',
      },
      {
        name: 'GASTRONOMÍA',
      },
      {
        name: 'HUMOR',
      },
      {
        name: 'INFANTIL/JUVENIL',
      },
      {
        name: 'INTERVENCIÓN URBANA',
      },
      {
        name: 'LITERATURA',
      },
      {
        name: 'MUESTRA',
      },
      {
        name: 'OBRA TEATRAL',
      },
      {
        name: 'OFICIOS',
      },
    ];

    public map;

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private _userService: UserService,
      private snackBar: MatSnackBar
    ) {
      this.event = new Events( '','test','',{lat: 0,long: 0,nombre:''}, '','','','', '', '' );
      this.stateCtrl = new FormControl();
      this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(state => state ? this.filterStates(state) : this.states.slice());
    }

    filterStates(name: string) {
      this.event.tipo = name;
      return this.states.filter(state =>
        state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);

    }

    ngOnInit() {
      this.identity = this._userService.getIdentity();
      //set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;
      this.latitudeMark = 0;
      this.longitudeMark = 0;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position

      //load Places Autocomplete
      // this.mapsAPILoader.load().then(() => {
      //   let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      //     types: ["address"]
      //   });
      //   autocomplete.addListener("place_changed", () => {
      //     this.ngZone.run(() => {
      //       //get the place result
      //       let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      //
      //       //verify result
      //       if (place.geometry === undefined || place.geometry === null) {
      //         return;
      //       }
      //
      //       //set latitude, longitude and zoom
      //       this.latitude = place.geometry.location.lat();
      //       this.longitude = place.geometry.location.lng();
      //       this.zoom = 12;
      //     });
      //   });
      // });

      // var mapD = "http://maps.googleapis.com/maps/api/geocode/json?address=casino+dreams&key=AIzaSyBeIMKT6zX8MSFE1cFEwKnh0V2Xs63jQ1I";
      // console.log(mapD)
      // var mapProp = {
      //       center: new google.maps.LatLng(this.latitude, this.longitude),
      //       zoom: 5,
      //       mapTypeId: google.maps.MapTypeId.ROADMAP
      //   };
      //   var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      // this.setCurrentPosition();
      //
      //
      //
      // this.map = new google.maps.Map(document.getElementById('map'), {
      //
      //   center: {lat: this.latitude, lng: this.longitude},
      //   zoom: 8
      // });

      this.initMap();
    }

    @ViewChild("search") search;

    initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
      });
      var geocoder = new google.maps.Geocoder();

      var searchAddress = this.search.nativeElement.value;
      console.log(searchAddress)

      document.getElementById('submit').addEventListener('click', function() {
        var address = searchAddress;
        geocoder.geocode({'address': address}, function(results, status) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
          console.log(marker)
        });

      });
    }

    // GoogleMap(position) {
    //   var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //
    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 20,
    //     disableDefaultUI: true,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   });
    // }

    placeMarker( $event, data){
      this.latitudeMark = $event.coords.lat;
      this.longitudeMark = $event.coords.lng;
    }

    private setCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
        });
      }
    }

    onChange(event) {
      this.files = event.srcElement.files;
      // this.event.image = this.files[0].name;
    }

    onSubmit( desc:string ){
      this.event.ubicacion.lat = this.latitudeMark;
      this.event.ubicacion.long = this.longitudeMark;
      this.event.org = this.identity.name;
      this.event.icon = this.identity.foto;
      this.event.descripcion = desc;
      if (this.files) {
        this._userService.saveImg( [], this.files, 'image' )
            .then(( result: any ) => {
              this.event.image = result.image;
              this._userService.saveEvent( this.event ).subscribe(
               response => {
                 if (response.events) {
                   this.status = 'El registro se a realizado correctamente';
                   console.log( response.message );
                   this.snackBar.open( response.message, 'close', { duration: 5000});
                   this.event = new Events( '','','',{lat: 0,long: 0,nombre:''}, '','','','', '', '' );
                 }else{
                   this.status = 'Erros en el registro';
                   console.log( response.message );
                   this.snackBar.open( response.message, 'close', { duration: 2500});
                 }
               },error => {
                 console.log(<any>error);
               }
              );
            });
      }else{
        this.snackBar.open( 'Seleccione una imagen', 'close', { duration: 5000});
      }

    }
}
