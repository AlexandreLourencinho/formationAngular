import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./components/customers/customers.component";
import {ProductsComponent} from "./components/products/products.component";
import {LoginComponent} from "./components/login/login.component";
import {AdminTemplateComponent} from "./components/admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {NewProductComponent} from "./components/new-product/new-product.component";
import {EditProductsComponent} from "./components/edit-products/edit-products.component";

const routes: Routes = [
  { path : "login", component : LoginComponent},
  { path : "", component : LoginComponent},
  { path : "admin", component : AdminTemplateComponent,canActivate: [AuthenticationGuard], children : [
      { path : "customers", component : CustomersComponent},
      { path : "products", component : ProductsComponent},
      { path : "new-product", component : NewProductComponent},
      { path : "edit-product/:id", component : EditProductsComponent},
    ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
