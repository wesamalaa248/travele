import { Component } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {
  itemSaved = false;

  saveItem() {
    this.itemSaved = true;
  }

  removeItem() {
    this.itemSaved = false;
  }
  
}
