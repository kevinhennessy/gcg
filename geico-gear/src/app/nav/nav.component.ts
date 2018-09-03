import { Component } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'gcg-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private shoppingCartService: ShoppingCartService) {}

  get cartTotalQuantity(): number {
    // null removes attribute from the element, so the badge is not displayed.
    return this.shoppingCartService.totalQuantity || null;
  }

  }
