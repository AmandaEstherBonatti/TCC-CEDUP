import { Component, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/providers/api.provider";

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FeedComponent {

    longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
    from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
    originally bred for hunting.`;

    userId: any;
    user: any;
    role: any;
    token: any;

    constructor(private api: ApiService, private router: Router,) { }

    ngOnInit(): void {
        this.token = sessionStorage.getItem('token')!;
        if (!this.token) {
            this.router.navigate(['menu/inicial']);
        } else {
            this.role = sessionStorage.getItem('role')

        }
    }



}
