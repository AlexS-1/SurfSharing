import { TestBed } from '@angular/core/testing';

import { AppFetchDataTsService } from './app.fetch-data.ts.service';

describe('AppFetchDataTsService', () => {
  let service: AppFetchDataTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppFetchDataTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
