import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authReq = req.clone({
            headers: req.headers.set('X-Api-Key', `${environment.token}`)
        });
        return next.handle(authReq);
    }
}
