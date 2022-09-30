import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  activeMenu!: '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  form!: FormGroup;
  public get fb(): FormBuilder {
    return this._fb;
  }
  public set fb(value: FormBuilder) {
    this._fb = value;
  }
  tabIndex = 0;
  loginForm!: FormGroup;
  message!: string;
  showBanner: boolean = false;
  users = [];
  isLoading: boolean = false;


  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
    });
  }

  checkMethod(event: any) {

  }


  handleBanner(event: any): void {
    this.message = '';
    this.showBanner = false;
  }

  buttonClick(){
    this.loginForm.controls['email'].markAsTouched();
    this.loginForm.controls['password'].markAsTouched();
  }

  async onSubmit(): Promise<void> {
    if(this.loginForm.valid){

    }
    }

}
