import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
    @ViewChild("feedInput") feedInputRef!: ElementRef;
    myFormGroup!: FormGroup;   
    publics: Array<string> = [];
    showEmojiPicker = false;
    message = ''
    sets = [
        'native',
        'google',
        'twitter',
        'facebook',
        'emojione',
        'apple',
        'messenger'
    ]
    set = 'twitter';
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
        const {message} = this;
        const text = `${message}${event.emoji.native}`
        this.message = text;
    }

    toggleEmojiPicker(){
        this.showEmojiPicker = !this.showEmojiPicker;
        console.log("🚀 ~ file: feed.component.ts ~ line 57 ~ FeedComponent ~ toggleEmojiPicker ~ this.showEmojiPicker", this.showEmojiPicker)
    }

    onFocus(){
        this.showEmojiPicker = false;
    }
}
