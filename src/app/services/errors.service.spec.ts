import { TestBed } from '@angular/core/testing';

import { ErrorsService } from './errors.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError } from 'rxjs';

describe('ErrorsService', () => {
  let service: ErrorsService;
  let error: HttpErrorResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error', () => {
    error = new HttpErrorResponse({});
    service.handleHTTPErrors(error).subscribe({
      error: () => throwError(() => error),
    });
    expect(service.handleHTTPErrors).toThrowError;
  });

  it('handle API errors', () => {
    error = new HttpErrorResponse({});
    const result = service.handleAPIErrors();
    expect(result).toBe(
      'The city you are looking for does not exist! Please try again'
    );
  });
});
