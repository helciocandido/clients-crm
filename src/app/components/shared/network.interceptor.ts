import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SpinnerService } from './spinner/spinner.service';

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercepting request', request);
    this.spinnerService.requestStarted();
    return next.handle(request).pipe(
      finalize(() => {
        console.log('request finished');
        this.spinnerService.resetSpinner();
      })
    );
  }
}
