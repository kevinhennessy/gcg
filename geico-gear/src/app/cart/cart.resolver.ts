import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';

import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../services/product';

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<Observable<Product[]>> {
  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  resolve(): Observable<Product[]> {
    // Get IDs of all products in the shopping cart.
    const productsInCart = Object.keys(this.shoppingCartService.getItems());

    const requests = productsInCart.map(productId =>
      this.productService.getProductById(productId)
    );

    // Create an observable that emits the result when all the requests
    // successfully complete.
    return requests.length ? forkJoin(requests) : of([]);
  }
}
