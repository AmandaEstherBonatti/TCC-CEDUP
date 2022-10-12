import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiGateway } from "src/api-gateway";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
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

    createPacient(pacient: any) {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post('clients', pacient)

                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

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