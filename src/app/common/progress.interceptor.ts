import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ProgressBarService } from './progress-bar/progress-bar.service';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

  constructor(private progress: ProgressBarService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progress.pendingRequests++;
    return next.handle(req)
      .pipe(
        finalize(() => {
          this.progress.pendingRequests--;
        })
      );
  }
}