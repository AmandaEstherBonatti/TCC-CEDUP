import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Observable, Observer} from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
  imagePath: string;
}

@Component({
  selector: 'app-pacient',
  templateUrl: './pacient.component.html',
  styleUrls: ['./pacient.component.css']
})
export class PacientComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  codeFormControl = new FormControl('', [Validators.required]);
  telFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);
  birthdayFormControl = new FormControl('', [Validators.required]);

  passwordView = false;
  genreView = false;

  asyncTabs!: Observable<ExampleTab[]>;

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          {label: '', content: 'Sessões online com profissionais certificados a qualquer hora e em qualquer lugar com segurança', imagePath: "../../../assets/profissional-online.png"},
          {label: '', content: 'Conteúdos personalizados para diferentes momentos e situações da sua vida', imagePath: "../../../assets/content-online.png"}
        ]);
      }, 1000);
    })
  }

  ngOnInit(): void {
  }

  viewPassword(){
    this.passwordView = !this.passwordView;
    if(this.passwordView == true){
      document.getElementById('password-input')?.setAttribute('type', 'text');
    }else{
      document.getElementById('password-input')?.setAttribute('type', 'password');
    }
  }

  viewGenre(){
    let width = document.getElementById('radio-button') as HTMLDivElement;
    this.genreView = true;
    width.style.maxWidth = '80%'
  }
}
