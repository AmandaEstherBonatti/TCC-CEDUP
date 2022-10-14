import { Component, HostListener, OnInit } from '@angular/core';
import { GiphyDialogService } from './giphy-dialog.service';


@Component({
  selector: 'app-giphy-dialog',
  templateUrl: './giphy-dialog.component.html',
  styleUrls: ['./giphy-dialog.component.css']
})
export class GiphyDialogComponent implements OnInit {

  searchTerm!: string;

  @HostListener('window:scroll')
  onScroll(){
    if((window.innerHeight + window.scrollY) >= document.body.scrollHeight){
      this.giphyService.next();
    }
  }

  constructor(public giphyService: GiphyDialogService) { }

  search(){
    this.giphyService.search(this.searchTerm);
  }

  ngOnInit(): void {
  }

}
