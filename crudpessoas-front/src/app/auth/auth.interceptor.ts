import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers
        .append('Content-Type', 'application/json')
        .append('Accept', 'application/json')
        .append('Authorization', 'Basic ' + btoa('admin:admin'))
    });

    return next.handle(req);
  }
}
