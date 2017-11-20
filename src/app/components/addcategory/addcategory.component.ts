import { Component, OnInit,  } from '@angular/core';
import { UserService } from '../../services/api-rest.service';
import { Category } from '../../models/models';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})

export class AddcategoryComponent implements OnInit {

  public category: Category;

  constructor(
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) { this.category = new Category( '' ); }

  ngOnInit() {  }

  save(){
    this._userService.saveCategory( this.category ).subscribe( response => {
      this.snackBar.open(response.message, 'close', { duration: 2500 });
    });
  }

}
