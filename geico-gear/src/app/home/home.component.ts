import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product';

@Component({
  selector: 'gcg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly categories = ['all', 'office', 'tech', 'outdoor'];
  categoryName: string;
  products: Product[];

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
