import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models';
import { FormControl } from '@angular/forms';
import { UserService } from '../../services/api-rest.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-requestaccount',
  templateUrl: './requestaccount.component.html',
  styleUrls: ['./requestaccount.component.css'],
  providers: [ UserService ]
})
export class RequestaccountComponent implements OnInit {

  public user: User;
  public files;
  public type;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;

  types: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.user = new User( '', '', '', '', '', 'ROLE_USER', '', '', '', false, '' );
  }

  ngOnInit() {
    this._userService.getTypes().subscribe( response => { this.types = response.Tipos; });
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.types.slice());
  }

  filterStates(nombre: string) {
    this.type = nombre;
    this.user.Type = this.type;
    return this.types.filter(state =>
      state.nombre.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }

  onChange(event) {
    this.files = event.srcElement.files;
  }

  onSubmit( pass, repass ){
    if ( pass == repass ) {
        this.user.password = pass;
    }else{
      this.user.password = '';
    }

    let trueType = false;

    for (let i = 0; i < this.types.length; i++) {
      if (this.types[i].nombre == this.type) {
        trueType = true;
      }
    }

    if (this.files) {
      if (trueType) {
        this._userService.saveIcon( [], this.files, 'image' )
            .then(( result: any ) => {
              this.user.foto = result.image;
              this._userService.saveUser( this.user ).subscribe(
                response => {
                  console.log(this.user)
                  console.log(response.user)
                  if (response.user) {
                    console.log(response.message)
                    this.snackBar.open( response.message, 'close', { duration: 5000});
                  }else{
                    this.snackBar.open( response.message, 'close', { duration: 5000});
                  }
                });
             });
      }else{
        this.snackBar.open( 'Seleccione un tipo de Organización valido', 'close', { duration: 5000});
      }
    }else{
      this.snackBar.open( 'Seleccione una imagen y/o complete los campos faltantes.', 'close', { duration: 5000});
    }
  }

}
