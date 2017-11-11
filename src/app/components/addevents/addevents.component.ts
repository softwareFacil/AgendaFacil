import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
  providers: [UserService]
})
export class AddeventsComponent implements OnInit, AfterViewInit {

  public latitude: number;
  public longitude: number;
  public latitudeMark: number;
  public longitudeMark: number;
  public searchControl: FormControl;
  public zoom: number;
  public event: Events;
  public identity;
  public Fecha: Date;
  public act;
  public status: string;
  public files;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  categories = [];

  // states: any[] = [
  //   {
  //     name: 'ACTO',
  //   },
  //   {
  //     name: 'AUDICION',
  //   },
  //   {
  //     name: 'BAILE',
  //   },
  //   {
  //     name: 'BICICLETADA',
  //   },
  //   {
  //     name: 'CAMPEONATO',
  //   },
  //   {
  //     name: 'CAPACITACIÓN',
  //   },
  //   {
  //     name: 'CARRERA ATLETICA',
  //   },
  //   {
  //     name: 'CHARLA',
  //   },
  //   {
  //     name: 'CIRCO',
  //   },
  //   {
  //     name: 'CIRCUITO DEPORTIVO',
  //   },
  //   {
  //     name: 'CONCIERTO',
  //   },
  //   {
  //     name: 'CONFERENCIA',
  //   },
  //   {
  //     name: 'CONGRESO',
  //   },
  //   {
  //     name: 'CORO',
  //   },
  //   {
  //     name: 'ORQUESTA',
  //   },
  //   {
  //     name: 'CULTURA COMUNITARIA',
  //   },
  //   {
  //     name: 'CURSO',
  //   },
  //   {
  //     name: 'DANZA',
  //   },
  //   {
  //     name: 'DEGUSTACIÓN',
  //   },
  //   {
  //     name: 'DIÁLOGO',
  //   },
  //   {
  //     name: 'ELECCIONES VECINALES',
  //   },
  //   {
  //     name: 'ENCUENTRO',
  //   },
  //   {
  //     name: 'EXHIBICIÓN',
  //   },
  //   {
  //     name: 'EXPOSICIÓN',
  //   },
  //   {
  //     name: 'FERIA',
  //   },
  //   {
  //     name: 'FESTIVAL',
  //   },
  //   {
  //     name: 'GASTRONOMÍA',
  //   },
  //   {
  //     name: 'HUMOR',
  //   },
  //   {
  //     name: 'INFANTIL/JUVENIL',
  //   },
  //   {
  //     name: 'INTERVENCIÓN URBANA',
  //   },
  //   {
  //     name: 'LITERATURA',
  //   },
  //   {
  //     name: 'MUESTRA',
  //   },
  //   {
  //     name: 'OBRA TEATRAL',
  //   },
  //   {
  //     name: 'OFICIOS',
  //   },
  // ];


  @ViewChild("search")
  public searchElementRef: ElementRef;
  geocoder = new google.maps.Geocoder();
  map;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.event = new Events('', 'test', '', { lat: 0, long: 0, nombre: '' }, '', '', '', '', '', '');
    this._userService.getCategories().subscribe( response => { this.categories = response.Catergories;
    });
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.categories.slice());
  }

  filterStates(name: string) {
    this.event.tipo = name;
    return this.categories.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);

  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    //set google maps defaults


    this.searchControl = new FormControl();

  }

  ngAfterViewInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: -34.397, lng: 150.644}
    });
  }

  geocodeAddres(address){
    //address = address.toString();
    this.geocoder.geocode({'address':address},(results, status)=>{
      if (status.toString() === 'OK') {
        this.map.setCenter(results[0].geometry.location);
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
        var marker = new google.maps.Marker({
          map: this.map,
          position: results[0].geometry.location
        });
        this.event.ubicacion.lat = results[0].geometry.location.lat();
        this.event.ubicacion.long = results[0].geometry.location.lng();
        this.event.ubicacion.nombre = results[0].formatted_address;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  @ViewChild("search") search;


  placeMarker($event, data) {
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

  onSubmit(desc: string) {
    this.event.org = this.identity.name;
    this.event.icon = this.identity.foto;
    this.event.descripcion = desc;
    if (this.files) {
      this._userService.saveImg([], this.files, 'image')
        .then((result: any) => {
          this.event.image = result.image;
          this._userService.saveEvent(this.event).subscribe(
            response => {
              if (response.events) {
                this.status = 'El registro se a realizado correctamente';
                console.log(response.message);
                this.snackBar.open(response.message, 'close', { duration: 5000 });
                this.event = new Events('', '', '', { lat: 0, long: 0, nombre: '' }, '', '', '', '', '', '');
              } else {
                this.status = 'Erros en el registro';
                console.log(response.message);
                this.snackBar.open(response.message, 'close', { duration: 2500 });
              }
            }, error => {
              console.log(<any>error);
            }
          );
        });
    } else {
      this.snackBar.open('Seleccione una imagen', 'close', { duration: 5000 });
    }

  }
}
