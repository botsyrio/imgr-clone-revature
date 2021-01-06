import { TestBed } from '@angular/core/testing';

import { AlbumEditGuard } from './album-edit.guard';

describe('AlbumEditGuard', () => {
  let guard: AlbumEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AlbumEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
