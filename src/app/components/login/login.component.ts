import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../service/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {
    "username": "admin@example.com",
    "password": "Password1",
  };
  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(user){
    let self = this;
    this.authService.login(user)
    .then((data)=>{
      this.router.navigate(["exercise/wheeloflife"])
    })
    .catch((error)=>{
      if(error.status === 401) {
        this.authService.createAccount(user)
        .toPromise()
        .then((data)=>{
          self.login(user);
        })
      }
    })
  }
}
