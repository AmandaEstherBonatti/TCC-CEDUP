import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GiphyDialogService } from './giphy-dialog.service';

describe('GiphyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
  }));

  it('should be created', () => {
    const service: GiphyDialogService = TestBed.get(GiphyDialogService);
    expect(service).toBeTruthy();
  });
});
