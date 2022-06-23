import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentification/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userFormGroup!: FormGroup;
  public errMessage: any;


  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username: this.fb.control(null),
      password: this.fb.control(null)
    });
  }

  public handleLogin() {
    const username: string = this.userFormGroup.value.username;
    const password: string = this.userFormGroup.value.password;
    this.authService.login(username, password).subscribe({
      next: (appUser) => {
        this.authService.authenticateUser(appUser).subscribe((data) => {
            this.router.navigateByUrl("/admin");
          });
      }, error: (err) => {
        console.log('err', err);
        this.errMessage = err;
      }
    })
  }
}
