import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import 'rxjs/add/operator/debounceTime';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../services/product';


@Component({
  selector: 'gcg-cart',
  styleUrls: ['./cart.component.css'],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  products: Product[];

  formModel: FormGroup;

  constructor(private cart: ShoppingCartService, route: ActivatedRoute) {
    this.products = route.snapshot.data['products'];
    const cartItems = this.cart.getItems();

    const controls = this.products.reduce((accumulator, product) => {
      const control = new FormControl(cartItems[product._id], positive);
      return Object.assign(accumulator, { [product._id]: control });
    }, {});

    this.formModel = new FormGroup(controls);
    this.formModel.valueChanges
     // .debounceTime(200)
      .subscribe(value => {
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

function positive(control: AbstractControl): { [key: string]: boolean } {
  const valid = Number.isInteger(control.value) && control.value > 0;
  return valid ? null : { positive: true };
}
