import { Injectable } from '@angular/core';
import {AppUser} from "../../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private users: Array<AppUser> = [];
  authenticatedUser: AppUser | undefined;

  constructor() {
    this.users.push(
      {id: UUID.UUID().toString(), username: "Alexandre", password:"1234", roles: ["ADMIN", "USER"]},
      {id: UUID.UUID().toString(), username: "Morgane", password:"1234", roles: ["USER"]},
      {id: UUID.UUID().toString(), username: "user1", password:"1234", roles: ["ADMIN", "USER"]},
      {id: UUID.UUID().toString(), username: "user2", password:"1234", roles: ["USER"]}
    );



  }

  public login(username: string, password: string): Observable<AppUser> {
    console.log('this.users', this.users);
    let appUser = this.users.find(u => u.username === username);
    if (!appUser) return throwError(() => new Error("user not found"));
    if (appUser.password !==password) return throwError(() => new Error("bad credentials"));

    return of(appUser);

  }

  public authenticateUser(appUser: AppUser): Observable<boolean> {
    this.authenticatedUser = appUser;
    localStorage.setItem("authUser", JSON.stringify({username: this.authenticatedUser.username,
      roles: this.authenticatedUser.roles, jwt: "JWT_TOKEN"}));

    return of(true);

  }

  public hasRole(role: string): boolean {
    if (this.isAuthenticated()) {
      return this.authenticatedUser!.roles.includes(role);
    } else return false;
  }

  public isAuthenticated(): boolean {
    return this.authenticatedUser !== undefined;
  }

  public logout(): Observable<boolean> {
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }


}
