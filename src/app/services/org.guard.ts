import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/api-rest.service';

@Injectable()
export class OrgGuard implements CanActivate{

  constructor(
    private _router: Router,
    private _userService: UserService
  ){}

  canActivate(){
    let identity = this._userService.getIdentity();

    if (identity && identity.role == 'ROLE_USER') {
        return true;
    }else{
      this._router.navigate(['/Home']);
      return false;
    }
  }

}
