import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products!: Array<Product>;

  constructor() {

    this.products = [
      {id: UUID.UUID(), name: "computer", price: 6500, promotion: true},
      {id: UUID.UUID(), name: "Printer", price: 800, promotion: false},
      {id: UUID.UUID(), name: "Smartphone", price: 1400, promotion: true},
      {id: UUID.UUID(), name: "other", price: 234, promotion: false},
    ];
    for(let i = 0; i<10; i++) {
      this.products.push({id: UUID.UUID(), name: "computer", price: 6500, promotion: true});
      this.products.push({id: UUID.UUID(), name: "Printer", price: 800, promotion: false});
      this.products.push({id: UUID.UUID(), name: "Smartphone", price: 1400, promotion: true});
      this.products.push({id: UUID.UUID(), name: "other", price: 234, promotion: false});
    }
  }

  public getAllProducts() : Observable<Array<Product>> {
    let rnd = Math.random();
    if(rnd<0.1) return throwError(() => new Error("500 internal server error: ça n'est pas de votre faute, " +
      "c'est de la notre!")); // throwError et new Error permettent de gérer une erreur sous forme d'observable
    return of(this.products);
  }

  public getPageProduct(page: number, size: number): Observable<PageProduct> {
    let index = page * size;
    let totalPage = ~~(this.products.length/size);
    if(this.products.length % size !=0) totalPage++;
    let pageProducts: Array<Product> = this.products.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPage, products: pageProducts});
  }

  public deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter(p => p.id != id);
    return of(true);
  }

  public setPromotion(id: string): Observable<boolean>{
    let product = this.products.find(p=>p.id === id);
    if (product === undefined) return throwError(() => new Error("product not found"));
    product.promotion = !product.promotion;
    return of(true);
  }

  public searchProduct(keyword: string, page: number, size: number): Observable<PageProduct> {
    let result = this.products.filter(p => p.name.includes(keyword));
    let index = page * size;
    let totalPage = ~~(result.length/size);
    if(this.products.length % size !=0) totalPage++;
    let pageProducts: Array<Product> = result.slice(index, index + size);
    if (pageProducts === undefined) return throwError(() => new Error("product not found"));
    return of({page: page, size: size, totalPages: totalPage, products: pageProducts});
  }

  public addNewProduct(product: Product): Observable<Product> {
    product.id = UUID.UUID();
    this.products.push(product);
    return of(product);
  }

  public getProduct(id: string): Observable<Product> {
    const product: Product | undefined = this.products.find(p => p.id === id);
    if (product === undefined) return throwError("produit non trouvé");
    return of(product);
  }

  public updateProduct(product: Product) {
    this.products = this.products.map(p => (p.id === product.id)? product : p); // si p.id égal product.id, product est inséré, sinon l'ancien (p) est laissé
    return of(product);
  }

  public getErrorMessage(name: string, errors: ValidationErrors) {
    if (errors['required']) {
      return "Ce champ est recquis.";
    } else if (errors['minlength']) {
      return "Ce champ doit contenir au moins " + errors['minlength']['requiredLength'] + "charatères.";
    }else if (errors['min']) {
      return " La valeur de ce champ doit être au moins supérieur à " + errors['min']['min'] + ".";
    } else return "";
  }

}
