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
  telFormControl = new FormControl('55', [Validators.maxLength(14)]);
  cpfFormControl = new FormControl('', [Validators.maxLength(11)]);

  passwordView = false;
  checked = false;
  crpBox = true;
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

  viewCRP(){
    this.crpBox = true;
  }

  dontViewCRP(){
    this.crpBox = false;
  }

  // check(){
  //   this.checked = !this.checked;
  //   let block = document.getElementById('block') as HTMLDivElement
  //   if(this.checked == true) {
  //     block.style.backgroundColor = '#df3ccf'
  //   }else{
  //     block.style.backgroundColor = '#fff'
  //   }
  //   console.log("🚀 ~ file: doctor.component.ts ~ line 49 ~ DoctorComponent ~ check ~ this.checked", this.checked)
    
  // }

}
