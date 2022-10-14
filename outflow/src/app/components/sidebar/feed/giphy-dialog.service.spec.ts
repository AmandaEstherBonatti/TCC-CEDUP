import { TestBed } from '@angular/core/testing';

import { GiphyDialogService } from './giphy-dialog/giphy-dialog.service';

describe('GiphyDialogService', () => {
  let service: GiphyDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiphyDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
