import { Component, OnInit } from '@angular/core';
import { User } from '../../models/models';
import { UserService } from '../../services/api-rest.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-editorg',
  templateUrl: './editorg.component.html',
  styleUrls: ['./editorg.component.css']
})
export class EditorgComponent implements OnInit {

  public _id;
  public user;
  public files;

  constructor(
    private _activateRouter: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this._id = _activateRouter.snapshot.paramMap.get('id');
    this.user = new User( '', '', '', '', '', 'ROLE_USER', '', '', '', false );
  }

  ngOnInit() {
    this._userService.getUserById(this._id).subscribe( response => { this.user = response.user });
  }

  onChange(event) {
    this.files = event.srcElement.files;
  }

  onSubmit( pass, repass ){
    if ( pass != '') {
      this.user.pass = true;
      if ( pass == repass ) {
          this.user.password = pass;
          console.log('test')
          this._userService.updateUser( this.user, this._id ).subscribe(
            response => {
              if (response.user) {
                console.log(response.message)
                this.snackBar.open( response.message, 'close', { duration: 5000});
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
      console.log(this.user)
      this._userService.updateUser( this.user, this._id ).subscribe(
        response => {
          if (response.user) {
            console.log(response.message)
            this.snackBar.open( response.message, 'close', { duration: 5000});
          }else{
            this.snackBar.open( response.message, 'close', { duration: 5000});
        }
      });
    }


  }

}
