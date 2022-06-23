import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products/products.service";
import {Product} from "../../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentification/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products!: Array<Product>;
  public errorMessage!: String;
  public searchFormGroup!: FormGroup;
  public currentPage: number = 0;
  public pageSize: number = 5;
  public totalPages!: number;
  public currentAction: string = "all";

  constructor(private productService: ProductsService,
              private fb: FormBuilder,
              public authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keywords: this.fb.control(null)
    });
    this.handleGetPageProducts();

  }


  public handleDeleteProduct(p: Product) {
    let conf = confirm("êtes-vous sûr de vouloir supprimer?");
    if (!conf) return;
    this.productService.deleteProduct(p.id).subscribe({
      next: (data) => {
        let index = this.products.indexOf(p);
        this.products.splice(index, 1);
      },
      error: (err) => {

      }
    });
  }

  public handleGetPageProducts() {
    this.currentAction = "all";
    this.productService.getPageProduct(this.currentPage, this.pageSize)
      .subscribe({
        next: data => {
          this.products = data.products;
          this.totalPages = data.totalPages;
          console.log(this.totalPages)
        },
        error: err => {

        }
      })
  }

  public handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (product) => { // next => si tout se passe bien
        this.products = product;
      },
      error: (err) => { // pour la gestion d'erreur
        this.errorMessage = err;
      }
    });
  }

  public handleSetPromotion(p: Product) {
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
        next: (data) => {
          p.promotion = !promo;
        },
        error: (err) => {
          this.errorMessage = err;
        }
      }
    )
  }

  public handleSearchProduct() {
    this.currentAction = "search";
    let keyword: string = this.searchFormGroup.value.keywords;
    this.productService.searchProduct(keyword, this.currentPage, this.pageSize).subscribe({
      next: data => {
        this.currentPage = data.page;
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error: err => {
        this.errorMessage = err;
      }
    });
  }

  public goToPage(i: number) {
    this.currentPage = i;
    if(this.currentAction === "all") this.handleGetPageProducts();
    else this.handleSearchProduct();
  }

  handleEditProduct(p: Product) {
    this.router.navigateByUrl("/admin/edit-product/"+p.id);
  }
}
