import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../services/product';

@Component({
  selector: 'gcg-cart',
  styleUrls: ['./cart.component.css'],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  products: Product[];
  formModel: FormGroup;

  constructor(private cart: ShoppingCartService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.products = this.route.snapshot.data['products'];
    const cartItems = this.cart.getItems();

    const controls = this.products.reduce((accumulator, product) => {
      const control = new FormControl(cartItems[product._id], Validators.min(0));
      return Object.assign(accumulator, { [product._id]: control });
    }, {});

    this.formModel = new FormGroup(controls);
    this.formModel.valueChanges.subscribe(value => {
      if (this.formModel.valid) {
        this.cart.setItems(value);
      }
    });
  }

  get total() {
    const cartItems = this.cart.getItems();
    return Object.keys(cartItems).reduce((total, productId) => {
      const product = this.products.find(p => p._id === productId);
      const quantity = cartItems[productId];
      return total + product.price * quantity;
    }, 0);
  }

  removeItem(productId: string) {
    const index = this.products.findIndex(p => p._id === productId);
    this.cart.removeItem(productId);
    this.products.splice(index, 1);
    this.formModel.removeControl(productId);
  }

}
