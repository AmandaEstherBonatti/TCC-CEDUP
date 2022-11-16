import { Component, OnInit } from '@angular/core';
import { removeStyles } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { DoctorService } from 'src/providers/api.provider';

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

  doctorForm!: FormGroup;

  passwordView = false;
  checked = false;
  crpBox = true;
  constructor(private fb: FormBuilder, private api: DoctorService, private router: Router,) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.doctorForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      gender: [null],
      timeExperience: [null],
      mainExpectation: [null],
      kindOfDoctor: [null],
      crp: [null],
      cpf: [null],
      phoneNumber: [null, Validators.required],
      User: this.fb.group({
        email: [null, [Validators.required]],
        password: [null, Validators.required],
        role: 2
      }),
    })
  }

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

  viewCRP() {
    this.crpBox = true;
  }

  dontViewCRP() {
    this.crpBox = false;
  }

  async save() {
    const data = this.doctorForm.getRawValue();
    const doctor = await this.api.createDoctor(data)
    this.router.navigate(['/login']);
  }

}
