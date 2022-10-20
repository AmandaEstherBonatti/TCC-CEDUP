import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    login(credentials: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post('auth/login', credentials)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                    // this.snackBar.successMessage(response.body.message);
                }, reject);
        });
    }

    findOneUser(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get("users/:id", { id: id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    update(id: string | null, user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put("users/:id", { id: id }, user)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

}

@Injectable({
    providedIn: 'root',
})
export class DoctorService {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    createDoctor(doctor: any) {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post('doctors', doctor)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }
}

@Injectable({
    providedIn: 'root',
})
export class PacientService {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    createPacient(pacient: any) {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post('clients', pacient)

                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    update(id: string | null, client: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put("clients/:id", { id: id }, client)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

}