import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { PacientService, UserService } from 'src/providers/api.provider';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @ViewChild('accordion', { static: true })
  Accordion!: MatAccordion;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits!: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  userId: any;
  user: any;
  role: any;
  token: any;
  accordion: any;

  file!: any;
  url: any;
  selectedFile: any;
  client: any;
  doctor: any;

  profileForm!: FormGroup;
  pacientForm!: FormGroup;
  doctorForm!: FormGroup;
  userForm!: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private httpClient: HttpClient,
    private pacientService: PacientService
  ) {
    ;
  }



  async ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('user_id');


    if (!this.token) {
      this.router.navigate(['menu/inicial']);
    } else {
      this.role = sessionStorage.getItem('role')
      this.initForm()
      await this.getUser()
      if (this.user.Client === null) {
        this.doctor = this.user.Doctor;
        this.setValue()
      } else {
        this.client = this.user.Client;
        this.setValue()
      }

      if (this.user.photo != undefined) {
        this.url = `http://localhost:3500/api/v1/users/file/upload/${this.user.photo}`

      } else {
        this.url = '../../../../assets/cloud.jpg'


      }

    }

  }

  initForm() {
    this.profileForm = this.fb.group({
      description: [null, Validators.required],
      hourlyRate: [null, Validators.required],
      User: [this.userId],
    });
    this.pacientForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      birthday: [null, Validators.required],
      gender: [null],
      phoneNumber: [null, Validators.required],
    });
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
    });
    this.userForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  async setValue() {
    this.Accordion.openAll();
    if (this.client != null) {
      await this.getUser()
      this.client = this.user.Client;
      this.pacientForm.patchValue(this.client);
      this.userForm.patchValue(this.user);
    } else if (this.doctor != null) {
      await this.getUser()
      this.doctor = this.user.Doctor;
      this.doctorForm.patchValue(this.doctor);
      this.userForm.patchValue(this.user);

    }
  }

  async getUser() {
    this.user = await this.userService.findOneUser(this.userId);


  }

  async saveEditPacient() {
    let dataClient = this.pacientForm.getRawValue();
    await this.pacientService.update(this.client.id, dataClient)
    this.Accordion.closeAll();

  }

  async saveEditUser() {
    let dataUser = this.userForm.getRawValue();

    await this.userService.update(this.userId, dataUser);
    this.Accordion.closeAll();


  }

  async fileChanged(event: any) {
    const file = event.target.files[0];
    let updatePhoto;
    const formData = new FormData();
    formData.append('file', file);

    try {
      this.httpClient
        .post('http://localhost:3500/api/v1/users/file/upload', formData)
        .subscribe(async resposta => {
          if (resposta) {
            this.file = resposta;
            updatePhoto = {
              photo: this.file.filename
            }
            await this.userService.update(this.userId, updatePhoto)

            this.url = 'http://localhost:3500/api/v1/users/file/upload/' + this.file.filename;
            console.log(this.url);
          }
        });

    } catch (e) {
      console.log(e);
    }
  }
}

