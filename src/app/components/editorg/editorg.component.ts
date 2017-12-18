import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models';
import { UserService } from '../../services/api-rest.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-editorg',
  templateUrl: './editorg.component.html',
  styleUrls: ['./editorg.component.css']
})
export class EditorgComponent implements OnInit {

  public _id;
  public user;
  public files;
  public type;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  types: any[] = [];

  constructor(
    private _activateRouter: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this._id = _activateRouter.snapshot.paramMap.get('id');
    this.user = new User( '', '', '', '', '', 'ROLE_USER', '', '', '', false, '' );
  }

  ngOnInit() {
    this._userService.getUserById(this._id).subscribe( response => { this.user = response.user });
    this._userService.getTypes().subscribe( response => { this.types = response.Tipos; });
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.types.slice());
  }

  filterStates(nombre: string) {
    this.type = nombre;
    return this.types.filter(state =>
      state.nombre.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }

  onChange(event) {
    this.files = event.srcElement.files;
  }

  onSubmit( pass, repass ){

    let trueType = false;
    let changeImage = false;

    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].nombre == this.type) {
        trueType = true;
      }
    }

    if (this.files) {
      if (this.files[0].name != this.user.foto) {
          this.user.foto = this.files[0].name;
          changeImage = true;
      }else{
        changeImage = false;
      }
    }
    // console.log(this.user.foto)

    if (trueType) {
      if ( pass != '') {
        this.user.pass = true;
        if ( pass == repass ) {
            this.user.password = pass;
            this._userService.updateUser( this.user, this._id ).subscribe(
              response => {
                if (response.user) {
                  this.snackBar.open( response.message, 'close', { duration: 5000});
                  if (changeImage) {
                    this._userService.saveIcon( [], this.files, 'image' )
                        .then(( result: any ) => {
                          this.user.foto = result.image;
                          this._userService.updateUser( this.user, this._id ).subscribe();
                        });
                  }
                }else{
                  this.snackBar.open( response.message, 'close', { duration: 5000});
              }
            });
        }else{
          this.user.password = '';
          this.snackBar.open( 'Las contraseñas no coinciden', 'close', { duration: 5000});
        }
      }else{
        this.user.pass = false;
        this._userService.updateUser( this.user, this._id ).subscribe(
          response => {
            if (response.user) {
              this.snackBar.open( response.message, 'close', { duration: 5000});
            }else{
              if (changeImage) {
                this._userService.saveIcon( [], this.files, 'image' )
                    .then(( result: any ) => {
                      this.user.foto = result.image;
                      this._userService.updateUser( this.user, this._id ).subscribe();
                    });
              }
              this.snackBar.open( response.message, 'close', { duration: 5000});
          }
        });
      }
    }else{
      this.snackBar.open( 'Seleccione un tipo de Organización valido', 'close', { duration: 5000});
    }


  }

}
