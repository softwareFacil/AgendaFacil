import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { Category } from '../../models/models';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {

  public category = [];

  constructor(
    private _apiService: UserService,
    private _router: Router
  ){
    this.category = [new Category( '' )];
  }

  ngOnInit(){
    this._apiService.getCategories().subscribe( response => {
      this.category = response.Catergories
    });
  }

  goCategory(actividad){
    console.log(actividad)
    this._router.navigate([ 'category/' + actividad ]);
  }

}
