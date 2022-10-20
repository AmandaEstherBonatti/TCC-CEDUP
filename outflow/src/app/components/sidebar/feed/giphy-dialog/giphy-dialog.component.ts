import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(public giphyService: GiphyDialogService, public dialogGiphy: MatDialogRef<GiphyDialogComponent>) { }

  search(){
    this.giphyService.search(this.searchTerm);
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogGiphy.close();
  }

  selectedGiphy(url: string){
    sessionStorage.setItem("selectedGiphy", JSON.stringify(url));
    this.dialogGiphy.close();
  }

}
