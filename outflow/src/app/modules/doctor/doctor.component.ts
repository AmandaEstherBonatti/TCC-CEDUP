import { Component, OnInit } from '@angular/core';
import { removeStyles } from '@angular/flex-layout';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  telFormControl = new FormControl('', [Validators.required]);
  cpfFormControl = new FormControl('', [Validators.required]);

  passwordView = false;
  checked = false;
  constructor() {}

  ngOnInit(): void {}

  viewPassword() {
    this.passwordView = !this.passwordView;
    if (this.passwordView == true) {
      document.getElementById('password-input')?.setAttribute('type', 'text');
    } else {
      document
        .getElementById('password-input')
        ?.setAttribute('type', 'password');
    }
  }

}
