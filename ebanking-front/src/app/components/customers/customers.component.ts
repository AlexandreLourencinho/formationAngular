import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../../services/customers/customers.service";
import {Customer} from "../../model/customers.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(
    private customerService: CustomersService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  public customers$!: Observable<Array<Customer>>; /* par convention, les variables contenant les observables se terminent par un $
  ici on laisse le fichier HTML gérer le côté async en assignant a customers$ le resultat de l'observable*/
  public errorMessage!: any;
  public formGroup!: FormGroup;
  private customer!: Customer;

  ngOnInit(): void {

    this.formGroup = this.fb.group({
        keyword: this.fb.control("")
      }
    );

    this.handleSearchCustomers();

  }

  public handleSearchCustomers() {
    const kw = this.formGroup.value.keyword;
    this.customers$ = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.name;
        return throwError(err);
      })
    );
  }

  public handleDeleteCustomer(customer: Customer) {
    if (confirm("Êtes-vous sûr de vouloir supprimer " + customer.name + " ?")) {
      this.customerService.deleteCustomer(customer.id).subscribe({
        next: () => {
          alert("le client à bien été supprimé");
          this.customers$ = this.customers$.pipe(
            map(data => {
              const index = data.indexOf(customer);
              data.slice(index, 1);
              return data;
            })
          );
        }, error: err => {
          alert("Une erreur est survenue lors la suppression. " + err.message);
          console.log('err', err);
        }
      });
    } else return;


  }

  public handleCustomerAccount(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/" + customer.id, {state: customer});
  }
}
