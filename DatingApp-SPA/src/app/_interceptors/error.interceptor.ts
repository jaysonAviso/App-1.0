import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError(error => {
                if(error instanceof HttpErrorResponse) {
                    if(error.status === 401) {
                        return throwError(error.statusText);
                    }
                    const applicationError = error.headers.get('Application-Error');
                    if(applicationError) {
                        console.error(applicationError);
                        return throwError(applicationError);
                    }
                    
                    const serverError = error.error.errors;
                    const serverErrors = error.error;
                    
                    let modalStateError = '';
                    if(serverError && typeof serverError === "object") {
                        for(const key in serverError) {
                            if (serverError[key]) {
                                modalStateError += serverError[key] + '\n';
                            }
                        }
                    }
                    return throwError(modalStateError || serverError || serverErrors || 'Server Error');
                }
            })
        );
    }
}
