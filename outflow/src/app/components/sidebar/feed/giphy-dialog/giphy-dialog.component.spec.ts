import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyDialogComponent } from './giphy-dialog.component';

describe('GiphyDialogComponent', () => {
  let component: GiphyDialogComponent;
  let fixture: ComponentFixture<GiphyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiphyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiphyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
