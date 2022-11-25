import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { DoctorService } from 'src/providers/api.provider';



@Component({
    selector: 'app-doctors',
    templateUrl: './doctors.component.html',
    styleUrls: ['./doctors.component.scss'],

})
export class DoctorsComponent implements OnInit {
    @ViewChild('filter', { static: true }) filter!: ElementRef;

    data: any[] = [];
    userId: any;
    user: any;
    params: string = '';
    select: number = 5;
    profileId: any;
    role: any;
    token: any;
    photoDoctor: any[] = [];


    constructor(private router: Router, private doctorService: DoctorService) { }

    ngOnInit(): void {
        this.findAll();
        this.initFilter()
        this.token = sessionStorage.getItem('token')!;
        if (!this.token) {
            this.router.navigate(['menu/inicial']);
        } else {
            this.role = sessionStorage.getItem('role')

        }
    }


    openProfile(profileId: string) {
        sessionStorage.setItem('other_profile_id', profileId)
        this.router.navigate(['home/perfil']);
    }

    initFilter() {
        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(debounceTime(200), distinctUntilChanged())

            .subscribe((res) => {
                this.data = this.data.filter(
                    (doctor) =>
                        doctor.name
                            .toLocaleLowerCase()
                            .includes(this.filter.nativeElement.value.toLocaleLowerCase())

                )
                this.params = this.filter.nativeElement.value;
                this.searchDoctors();
            });

    }

    async searchDoctors() {
        const data = {
            name: this.params,
            type: this.select,
        };
        try {
            this.data = await this.doctorService.findByName(data);
            for (let doctor of this.data) {
                if (doctor.User.photo != null) {
                    doctor.photoDoctor = `http://localhost:3500/api/v1/feeds/file/upload/${doctor.User.photo}`
                } else {
                    doctor.photoDoctor = '../../../../assets/cloud.jpg'
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    async selectList(ev: any) {
        this.select = ev.value
        this.searchDoctors();

    }


    async findAll() {
        this.data = await this.doctorService.findAll();

        for (let doctor of this.data) {
            if (doctor.User.photo != null) {
                doctor.photoDoctor = `http://localhost:3500/api/v1/feeds/file/upload/${doctor.User.photo}`
            } else {
                doctor.photoDoctor = '../../../../assets/cloud.jpg'
            }
        }
    }
}
