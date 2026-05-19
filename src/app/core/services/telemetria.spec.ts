import { TestBed } from '@angular/core/testing';

import { Telemetria } from './telemetria';

describe('Telemetria', () => {
  let service: Telemetria;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Telemetria);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
