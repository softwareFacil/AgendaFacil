import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  evento:any;

  constructor(private route: ActivatedRoute){  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.evento = params;
   });
  }

}
