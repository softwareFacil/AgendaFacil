import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  evento:any;
  public img = 'http://agenda.publibarrio.cl:3789/api/get-img/';
  public icon = 'http://agenda.publibarrio.cl:3789/api/get-icon/';

  constructor(private route: ActivatedRoute){  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.evento = params;
      console.log(this.evento);
   });
  }
}
