/**
 * Created by Алиска on 16.10.2017.
 */
import 'rxjs/add/operator/do';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export class JwtInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
            }
        });
    }
}