import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  public icon = 'http://agenda.publibarrio.cl:3789/api/get-icon/';
  public identity;

  constructor(
    private _apiService: UserService,
  ) { }

  ngOnInit() {
    this.identity = this._apiService.getIdentity();
  }

}
