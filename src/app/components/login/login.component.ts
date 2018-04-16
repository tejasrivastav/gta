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
    this.authService.login(user)
    .then((data)=>{
      this.router.navigate(["exercise/wheeloflife"])
    })
  }
}
