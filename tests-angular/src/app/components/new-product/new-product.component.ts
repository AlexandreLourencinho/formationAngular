import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products/products.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productFormGroup!: FormGroup;

  constructor(private fb: FormBuilder,
              public productService: ProductsService) { }

  ngOnInit(): void {

   this.productFormGroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(null, [Validators.required, Validators.min(15)]),
      promotion: this.fb.control(false, [Validators.required])
    })
  }

  public handleAddProduct() {
    console.log('this.productFormGroup.value', this.productFormGroup.value);
    const product = this.productFormGroup.value;
    this.productService.addNewProduct(product).subscribe((product) => {
      alert("produit  bien ajouté");
      this.productFormGroup.reset();
    }, (err) => {
      console.log('err', err);
    })
  }
}
