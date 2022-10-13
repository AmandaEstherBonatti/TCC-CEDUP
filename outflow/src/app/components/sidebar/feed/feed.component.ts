import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
    @ViewChild("feedInput") feedInputRef!: ElementRef;
    myFormGroup!: FormGroup;   
    publics: Array<string> = [];
    isEmojiPickerVisible!: boolean;
    inputText: string = ''
    

    constructor(private formBuilder: FormBuilder) { 

    }

    ngOnInit(): void {
        this.initForm();
    }

    initForm(){
        this.myFormGroup = this.formBuilder.group({
            public: ['', Validators.required]
        })
    }

    addPost(){
        const publication = this.feedInputRef.nativeElement.value;
        this.publics.push(publication);
        this.initForm();
    }

    addEmoji(event: any){
        this.inputText = event.emoji;
        this.isEmojiPickerVisible = false;
    }
}
