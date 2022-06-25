import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Customer} from "../../model/Customers.model";
import {CustomersService} from "../../services/customers/customers.service";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private customersService: CustomersService) {
  }

  public addCustFormGroup!: FormGroup;


  ngOnInit(): void {
    this.addCustFormGroup = this.fb.group({
      name: this.fb.control("", [Validators.minLength(4),
        Validators.required,
        Validators.pattern(/^[^[:;|=+*?<>\/\\,\]]+$/)]),
      email: this.fb.control("", [Validators.minLength(6), Validators.required, Validators.email])
      }
    );

  }

  public handleSaveCustomer() {
    const customer = this.addCustFormGroup.value;
    this.customersService.addCustomer(customer)
      .subscribe({
        next: customer => {
          alert("Le client " + customer.name + " à bien été enregistré");
          this.addCustFormGroup.reset();
        }, error: err => {
          console.log('err', err);
        }
      });

  }
}
