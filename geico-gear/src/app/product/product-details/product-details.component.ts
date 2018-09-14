import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../services/product';

@Component({
  selector: 'gcg-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  @Input() product: Product;

  quantity: number;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addItems() {
    this.shoppingCartService.addItem(this.product._id, this.quantity);
    this.quantity = null; // Reset selected number of items.
  }
}
