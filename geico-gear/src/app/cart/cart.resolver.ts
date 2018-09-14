import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../services/product';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<Product[]> {
  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  resolve() {
    const productsInCart = Object.keys(this.shoppingCartService.getItems());

    const requests = productsInCart.map(productId =>
      this.productService.getProductById(productId)
    );

    return requests;
  }
}
