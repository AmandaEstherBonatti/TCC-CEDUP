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
export class FeedService {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    createFeed(feed: any) {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post('feeds', feed)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    update(id: string | null, feed: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put("feeds/:id", { id: id }, feed)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findByUser(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get('feeds/user/:id', { id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get('feeds')
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

    update(id: string | null, doctor: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put("doctors/:id", { id: id }, doctor)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }


    findAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get("doctors")
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findByName(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway.post('doctors/find', data)
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

@Injectable({
    providedIn: 'root',
})
export class DetailsService {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    createDetail(detail: any) {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post('details-profile', detail)

                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    update(id: string | null, detail: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .put("details-profile/:id", { id: id }, detail)
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

}

@Injectable({
    providedIn: 'root',
})
export class HistoricService {
    constructor(private apiGateway: ApiGateway) { }

    ngOnInit(): void { }

    create(historic: any) {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .post('historic', historic)

                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

    findByDoctor(id: string | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiGateway
                .get('historic/doctor/:id', { id })
                .subscribe((response: HttpResponse<any>) => {
                    resolve(response.body);
                }, reject);
        });
    }

}
