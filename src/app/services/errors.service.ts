import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor() {}

  handleHTTPErrors(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  handleAPIErrors(): string {
    return 'The city you are looking for does not exist! Please try again'
  }
}
