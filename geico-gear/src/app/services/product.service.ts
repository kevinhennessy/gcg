import { Injectable } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products = PRODUCTS;

  constructor() { }

  getAll(): Product[] {
    return this.products;
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(
      product => product.category === category
    );
  }

  getProductById (id: string): Product {
    return this.products.find(
      product => product._id === id
    );
  }
}






