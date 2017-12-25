import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/api-rest.service';

@Injectable()
export class LoginGuard implements CanActivate{

  constructor(
    private _router: Router,
    private _userService: UserService
  ){}

  canActivate(){
    let identity = this._userService.getIdentity();

    if (identity) {
      this._router.navigate(['/Home']);
      return false;
    }else{
      return true;
    }
  }

}
