import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { PacientService } from 'src/providers/api.provider';

export interface ExampleTab {
  label: string;
  content: string;
  imagePath: string;
}

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class PacientComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  codeFormControl = new FormControl('', [Validators.required]);
  telFormControl = new FormControl('55', [Validators.maxLength(14)]);
  passwordFormControl = new FormControl('', [Validators.required]);
  birthdayFormControl = new FormControl('', [Validators.required]);

  passwordView = false;
  genreView = false;
  pacientForm!: FormGroup;


  asyncTabs!: Observable<ExampleTab[]>;

  constructor(private fb: FormBuilder, private api: PacientService, private router: Router,

  ) {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { label: '', content: 'Sessões online com profissionais certificados a qualquer hora e em qualquer lugar com segurança', imagePath: "../../../assets/profissional-online.png" },
          { label: '', content: 'Conteúdos personalizados para diferentes momentos e situações da sua vida', imagePath: "../../../assets/content-online.png" }
        ]);
      }, 1000);
    })
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.pacientForm = this.fb.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      birthday: [null, Validators.required],
      gender: [null],
      phoneNumber: [null, Validators.required],
      User: this.fb.group({
        email: [null, [Validators.required]],
        password: [null, Validators.required],
        role: 1
      }),
    })
  }

  viewPassword() {
    this.passwordView = !this.passwordView;
    if (this.passwordView == true) {
      document.getElementById('password-input')?.setAttribute('type', 'text');
    } else {
      document.getElementById('password-input')?.setAttribute('type', 'password');
    }
  }

  viewGenre() {
    let width = document.getElementById('radio-button') as HTMLDivElement;
    this.genreView = true;
    width.style.maxWidth = '80%'
  }


  async save() {
    let data = this.pacientForm.getRawValue();
    console.log(data)
    const paciente = await this.api.createPacient(data);
    this.router.navigate(['/login']);
    console.log(paciente)

  }
}
