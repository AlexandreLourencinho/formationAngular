import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductsService} from "../../services/products/products.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../model/product.model";

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {

  productFormGroup!: FormGroup;
  productId!: string;
  product!: Product;

  constructor(private fb: FormBuilder,
              public productService: ProductsService,
              private activatedRoute: ActivatedRoute) {
    this.productId = this.activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe((product) => {
      this.product = product;
    }, (error) => {
      console.log('error', error);
    });
    this.productFormGroup = this.fb.group({
      name: this.fb.control(this.product.name, [Validators.required, Validators.minLength(4)]),
      price: this.fb.control(this.product.price, [Validators.required, Validators.min(15)]),
      promotion: this.fb.control(this.product.promotion, [Validators.required])
    })
  }

  public handleUpdateProduct() {
    const product: Product = this.productFormGroup.value;
    product.id = this.productId;

    this.productService.updateProduct(product).subscribe(() => {
      alert("le produit à bien été mis à jour");
    }, (error) => {
      console.log('error', error);
    });
  }


}
