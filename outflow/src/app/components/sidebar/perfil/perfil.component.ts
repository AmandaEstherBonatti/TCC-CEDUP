import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { DetailsService, DoctorService, PacientService, UserService } from 'src/providers/api.provider';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @ViewChild('accordion', { static: true })
  Accordion!: MatAccordion;


  userId: any;
  user: any;
  role: any;
  token: any;
  accordion: any;

  otherProfile: any;
  otherProfileId: any;

  details: any;
  file!: any;
  url: any;
  selectedFile: any;
  client: any;
  doctor: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 2;


  profileForm!: FormGroup;
  pacientForm!: FormGroup;
  doctorForm!: FormGroup;
  userForm!: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private httpClient: HttpClient,
    private pacientService: PacientService, private doctorService: DoctorService, private _snackBar: MatSnackBar,
    private detailsService: DetailsService, public dialog: MatDialog
  ) {

  }

  async ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.userId = sessionStorage.getItem('user_id');
    this.otherProfile = Number(sessionStorage.getItem('other_profile'));
    this.otherProfileId = sessionStorage.getItem('other_profile_id');
    console.log(this.otherProfileId)

    if (!this.token) {
      this.router.navigate(['menu/inicial']);
    } else {
      if (this.otherProfileId) {
        console.log(this.otherProfileId)
        await this.getUser(this.otherProfileId)
        this.role = this.user.role;
        this.initForm()
      } else {
        this.initForm()
        await this.getUser(this.userId)
        this.role = this.user.role;
      }
      if (this.user.photo != undefined) {
        this.url = `http://localhost:3500/api/v1/users/file/upload/${this.user.photo}`
      } else {
        this.url = '../../../../assets/cloud.jpg'
      }
    }
  }

  async getUser(userId: string) {
    this.user = await this.userService.findOneUser(userId);
    if (this.user.Client === null) {
      this.doctor = this.user.Doctor;
      this.details = this.user.DetailsProfile
      this.setValueDoctor()
    } else {
      this.client = this.user.Client;
      this.setValue()
    }
  }

  initForm() {
    this.profileForm = this.fb.group({
      description: [null, Validators.required],
      specialty: [null, Validators.required],
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
      gender: [null, Validators.required],
      timeExperience: [null, Validators.required],
      mainExpectation: [null, Validators.required],
      kindOfDoctor: [null, Validators.required],
      crp: [null],
      cpf: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
    this.userForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  async setValue() {
    if (this.otherProfileId) {
      this.client = this.user.Client;
      this.pacientForm.patchValue(this.client);
    } else {
      this.client = this.user.Client;
      this.pacientForm.patchValue(this.client);
      this.userForm.controls['email'].setValue(
        this.user.email
      );
    }
  }

  async setValueDoctor() {
    if (!this.otherProfileId) {
      this.doctor = this.user.Doctor;
      this.doctorForm.patchValue(this.doctor);

      this.userForm.controls['email'].setValue(
        this.user.email
      );
    } else {
      this.doctor = this.user.Doctor;
      this.doctorForm.patchValue(this.doctor);
    }
    if (this.details != null) {
      this.profileForm.patchValue(this.details);
    }
  }

  async saveEditPacient() {
    try {
      let dataClient = this.pacientForm.getRawValue();
      const update = await this.pacientService.update(this.client.id, dataClient)
      this._snackBar.open("Informações atualizadas com sucesso!", 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      this.getUser(update.id);
    } catch (err) {
      console.log(err)
    }
  }

  async saveEditDoctor() {
    try {
      let dataDoctor = this.doctorForm.getRawValue();
      const update = await this.doctorService.update(this.doctor.id, dataDoctor)
      this._snackBar.open("Informações atualizadas com sucesso!", 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      this.getUser(update.id);

    } catch (err) {
      console.log(err)
    }
  }

  async saveEditUser() {
    try {
      let dataUser = this.userForm.getRawValue();
      await this.userService.update(this.userId, dataUser);
      this._snackBar.open("Informações criadas com sucesso!", 'Fechar', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
      this.Accordion.closeAll();
    } catch (err) {
      console.log(err)
    }
  }

  async save() {
    try {
      if (this.details === null) {
        let dataDetails = this.profileForm.getRawValue();
        await this.detailsService.createDetail(dataDetails)
        this._snackBar.open("Informações criadas com sucesso!", 'Fechar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
        this.getUser(this.doctor.id);

      } else {
        let dataDetails = this.profileForm.getRawValue();
        await this.detailsService.update(this.details.id, dataDetails)
        this._snackBar.open("Informações atualizadas com sucesso!", 'Fechar', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
        this.getUser(this.doctor.id);
      }
    } catch (err) {
      console.log(err);
    }
  }

  openChat() {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '500px',
      height: '620px',
    });

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
          }
        });
    } catch (e) {
      console.log(e);
    }
  }
}

