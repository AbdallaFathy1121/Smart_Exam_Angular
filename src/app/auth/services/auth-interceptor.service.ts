import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    authService: AuthService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.user.pipe(
            take(1),
            exhaustMap((user) => {
                if (!user) {
                    return next.handle(req);
                } else {
                    const token = this.authService.getUserToken();
                    const headers = new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token 
                    });
                    const modifiedReq = req.clone({ headers: headers });
                    return next.handle(modifiedReq);
                }
            })
        )
    }
    
}