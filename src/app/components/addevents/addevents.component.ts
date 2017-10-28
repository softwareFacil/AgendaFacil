import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Events } from '../../models/models';
import { UserService } from '../../services/api-rest.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

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

    @ViewChild("search")
    public searchElementRef: ElementRef;

    constructor(
      private mapsAPILoader: MapsAPILoader,
      private ngZone: NgZone,
      private _userService: UserService
    ) {
      this.event = new Events( '','','',{lat: 0,long: 0,nombre:''}, '','','','', '' );
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
      console.log(this.event);
      //set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;
      this.latitudeMark = 0;
      this.longitudeMark = 0;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();

      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
          });
        });
      });
    }

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
      var files = event.srcElement.files;
      this.event.image = files[0].name;
    }

    onSubmit(){
      // this.event.fecha_inicio = this.Fecha;
      this.event.espacios.lat = this.latitudeMark;
      this.event.espacios.long = this.longitudeMark;
      this.event.org = this.identity.name;
      this.event.icon = this.identity.foto;
      console.log(this.identity)
      console.log(this.event)
    }



}
