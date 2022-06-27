import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../../model/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(environment.basicURL + "/bank-account/" + accountId + "/pageOperations?page=" + page + "&size=" + size);
  }

  public debit(accountId: string, amount: number, description: string) {
    const debitData = {accountId, amount, description};
    return this.http.post(environment.basicURL + "/bank-account/debit", debitData);
  }

  public credit(accountId: string, amount: number, description: string) {
    const creditData = {accountId, amount, description};
    return this.http.post(environment.basicURL + "/bank-account/credit", creditData);
  }

  public transfert(accountSource: string, accountDestination: string, amount: number, description: string) {
    const transfertData = {accountSource, accountDestination, amount, description};
    return this.http.post(environment.basicURL + "/bank-account/transfert", transfertData);
  }


}
