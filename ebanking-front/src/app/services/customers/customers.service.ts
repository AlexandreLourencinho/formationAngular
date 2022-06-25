import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Customer} from "../../model/Customers.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {




  constructor(private http: HttpClient) { }

  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.basicURL + "/customers");
  }

  public searchCustomers(keyword: string) {
    return this.http.get<Array<Customer>>(environment.basicURL + "/customers/search?keyword=" + keyword);
  }

  public addCustomer(customer: Customer) {
    return this.http.post<Customer>(environment.basicURL + "/customers", customer);
  }

  public deleteCustomer(id: number) {
    return this.http.delete(environment.basicURL + "/customers/" + id);
  }


}
