import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HistoricService, UserService } from 'src/providers/api.provider';


export interface Historic {

  id: string,
  Client: {
    id: string,
    name: string,
    lastName: string,
    phoneNumber: string
  }
}


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phoneNumber', 'icon'];
  dataSource: any[] = [];
  data: any[] = [];
  userId: any;
  user: any;
  doctor: any;
  role: any;
  token: any;

  constructor(private router: Router, private historicService: HistoricService, private userService: UserService) { }

  async ngOnInit() {
    this.userId = sessionStorage.getItem('user_id');
    console.log(this.userId)
    this.token = sessionStorage.getItem('token')!;
    if (!this.token) {
      this.router.navigate(['menu/inicial']);
    } else {
      this.role = sessionStorage.getItem('role')
      await this.getUser()
      this.getClientes()

    }
  }

  async getUser() {
    this.user = await this.userService.findOneUser(this.userId);
    if (this.user.Doctor) {
      this.doctor = this.user.Doctor
    }
    console.log()
  }


  openProfile(profileId: string) {
    console.log(profileId)
    sessionStorage.setItem('other_profile', '0')
    sessionStorage.setItem('client_profile_id', profileId)
    this.router.navigate(['home/perfil']);
  }


  async getClientes() {
    this.dataSource = await this.historicService.findByDoctor(this.doctor.id)
    console.log(this.dataSource)
  }

}
