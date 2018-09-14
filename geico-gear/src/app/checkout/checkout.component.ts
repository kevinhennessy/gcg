import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gcg-checkout',
  styleUrls: ['./checkout.component.css'],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {

  formModel: FormGroup;

  readonly months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  currentYear = new Date().getFullYear();
  years = Array.from({ length: 10 }, (_, index) => this.currentYear + index);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formModel = this.fb.group({
      account: this.fb.group({
        email: [, [Validators.required, Validators.email]],
        phone: [, Validators.required]
      }),
      address: this.fb.group({
        line1: [, Validators.required],
        city: [, Validators.required],
        state: [, Validators.required],
        zip: [, Validators.required],
        country: [, Validators.required]
      }),
      payment: this.fb.group({
        cardholder: [, Validators.required],
        cardNumber: [, Validators.required],
        expiry: this.fb.group({
          month: [, Validators.required],
          year: [, Validators.required],
          cvv: [, Validators.required]
        })
      })
    });
  }

  hasError(errorCode: string, path: string[]) {
    return this.formModel.get(path).touched
      && this.formModel.hasError(errorCode, path);
  }

  placeOrder() {
    console.log(this.formModel.value);
  }

}
