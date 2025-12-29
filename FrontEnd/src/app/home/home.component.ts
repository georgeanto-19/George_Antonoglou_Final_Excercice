import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../uI-common/base-component';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  loginCredentials: FormGroup = null;
  needLogin: boolean = false;

  constructor(private router: Router, private http: HttpClient) {
    super();
    this.http.get(`${this.API_URL}/health`, {}).subscribe((res: any) => {
    });
  }

  ngOnInit(): void {
    const authToken = localStorage.getItem("access_token");
    this.needLogin = !authToken;
    this.loginCredentials = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  login(data: any) {
    this.http.post(`${this.API_URL}/api/auth`, { username: data.username, password: data.password }).subscribe((res: any) => {
      localStorage.setItem('access_token', res.token);
      this.needLogin = false;
    });
  }

  navigate(destination) {
    if (destination === "Owners") {
      this.router.navigate(['/owner-page']);
    }
    if (destination === "Vehicles") {
      this.router.navigate(['/vehicle-page']);
    }
    if (destination === "Insurances") {
      this.router.navigate(['/insurance-page']);
    }
    if (destination === "Full") {
      this.router.navigate(['/full-page']);
    }
    if (destination === "repair") {
      this.router.navigate(['/repair-page']);
    }
  }

}
