import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private toaster: ToastrService) {}
  error$ = new Subject<string>();

  handle(message: string): void {
    this.error$.next(message);
  }

  clear(): void {
    this.error$.next('');
  }

  handleError(err: HttpErrorResponse): void {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      switch (err.status) {
        case 400:
          errorMessage = `${err.status}: ${err.error.message}`;
          break;
        case 401:
          errorMessage = `${err.status}: You are unauthorized to do this action.`;
          break;
        case 403:
          errorMessage = `${err.status}: You don't have permission to access the requested resource.`;
          break;
        case 404:
          errorMessage = `${err.status}: The requested resource does not exist.`;
          break;
        case 412:
          errorMessage = `${err.status}: Precondition Failed.`;
          break;
        case 500:
          errorMessage = `${err.status}: Internal Server Error.`;
          break;
        case 503:
          errorMessage = `${err.status}: The requested service is not available.`;
          break;
        default:
          errorMessage = `${err.status}: Something went wrong!`;
          break
      }
    }
    this.toaster.error(errorMessage);
  }
}
