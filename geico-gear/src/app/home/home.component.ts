import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'gcg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly categories = ['all', 'office', 'tech', 'outdoor'];
  categoryName: string;
  products: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = params['category'];
      if (this.categoryName === 'all') {
        this.products = this.productService.getAll();
      } else {
        this.products = this.productService.getProductsByCategory(this.categoryName);
      }
    });
  }
}
