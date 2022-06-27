import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {AccountsService} from "../../services/accounts/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private accountService: AccountsService) { }

  public accountFormGroup!: FormGroup;
  public operationFormGroup!: FormGroup;
  public currentPage: number = 0;
  public pageSize: number = 5;
  public account$!: Observable<AccountDetails>;
  public errorMessage!: string;


  ngOnInit(): void {

    this.accountFormGroup = this.fb.group({
      accountId: ["", [Validators.required, Validators.minLength(10)]]
    });

    this.operationFormGroup = this.fb.group({
      operationType: [null, [Validators.required]],
      amount: [0, [Validators.required]],
      description: [null, [Validators.required]],
      accountDestination: [null]
    });

  }

  public handleSearchAccount() {
    const accountId: string = this.accountFormGroup.value.accountId;
    this.account$ = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  public goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  public handleAccountOperation() {

    const accountId = this.accountFormGroup.value.accountId;
    const data = this.operationFormGroup.value;
    data.accountId = accountId;
    const operationType = this.operationFormGroup.value.operationType;


    switch (operationType) {
      case "DEBIT":
        this.accountService.debit(data.accountId, data.amount, data.description).subscribe({
          next: (data) => {
            alert("Débit réussi");
            this.handleSearchAccount();
          }, error: (err) => {
            console.log('err',err);
          }
        });
        break;
      case "CREDIT":
        this.accountService.credit(data.accountId, data.amount, data.description).subscribe({
          next: (data) => {
            alert("Crédit réussi");
            this.handleSearchAccount();
          }, error: (err) => {
            console.log('err',err);
          }
        });
        break;
      case "TRANSFERT":
        this.accountService.transfert(data.accountId, data.accountDestination,data.amount, data.description).subscribe({
          next: (data) => {
            alert("Transfert réussi");
            this.handleSearchAccount();
          }, error: (err) => {
            console.log('err',err);
          }
        });
        break;
      default:
        alert("Veuillez séléctionner un type d'opération.");
        break;
    }

  }
}
