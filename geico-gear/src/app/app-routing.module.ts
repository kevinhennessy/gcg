import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CartResolver } from './cart/cart.resolver';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'categories' },
  {
    path: 'categories',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: ':category', component: HomeComponent },
    ]
  },
  { path: 'products/:productId', component: ProductComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'cart',
    component: CartComponent,
    resolve: {
      products: CartResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
