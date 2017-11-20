import { Component, ElementRef, NgZone, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Events, Location } from '../../models/models';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../services/api-rest.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService]
})
export class EditComponent implements OnInit {


  public _id;
  public latitude: number;
  public longitude: number;
  public latitudeMark: number;
  public longitudeMark: number;
  public searchControl: FormControl;
  public zoom: number;
  public event;
  ev: Events;
  public location: Location;
  public identity;
  public Fecha: Date;
  public act;
  public status: string;
  public files;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  categories: any[] = [];

  @ViewChild("search")
  public searchElementRef: ElementRef;
  geocoder = new google.maps.Geocoder();
  map;

  constructor(
    private _apiService: UserService,
    private _activateRouter: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {
    this._id = _activateRouter.snapshot.paramMap.get('id');
    this.event = new Events('', '', '', { lat: 0, long: 0, nombre: '' }, '', '', '', '', '', '');
    console.log(this.ev)
    this._apiService.getEventsById( this._id ).subscribe( response => {
      this.event.name = response.events.name;
      this.event.descripcion = response.events.descripcion;
      this.event.org = response.events.org;
      this.event.ubicacion.lat = response.events.ubicacion.lat;
      this.event.ubicacion.long = response.events.ubicacion.long;
      this.event.ubicacion.nombre = response.events.ubicacion.nombre;
      this.event.fecha_inicio = response.events.fecha_inicio;
      this.event.fecha_termino = response.events.fecha_termino;
      this.event.icon = response.events.icon;
      this.event.tipo = response.events.tipo;
      this.event.image = response.events.image;
      this.event.fono = response.events.fono;
    });
    this.location = new Location( 0, 0, '' );
    console.log(this.event)
  }

  filterStates(actividades: string) {
    this.event.tipo = actividades;
    return this.categories.filter(state =>
      state.actividades.toLowerCase().indexOf(actividades.toLowerCase()) === 0);
  }

  ngOnInit() {
    console.log(this.ev)

    this.identity = this._apiService.getIdentity();
    this._apiService.getCategories().subscribe( response => { this.categories = response.Catergories;
    });
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.categories.slice());
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
    this.location.lat = this.event.ubicacion.lat;
    this.location.lng = this.event.ubicacion.long;
    this.location.name = this.event.ubicacion.nombre;
    if (this.files) {
      this._apiService.saveImg([], this.files, 'image')
        .then((result: any) => {
          this.event.image = result.image;
          this._apiService.saveEvent(this.event).subscribe(
            response => {
              if (response.events) {
                this.status = 'El registro se a realizado correctamente';
                this.snackBar.open(response.message, 'close', { duration: 5000 });
                this.event = new Events('', '', '', { lat: 0, long: 0, nombre: '' }, '', '', '', '', '', '');
                this._apiService.saveLocation( this.location ).subscribe( response => {
                });
              } else {
                this.status = 'Erros en el registro';
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
