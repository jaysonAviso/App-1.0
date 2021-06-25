import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NavigationExtras, Router} from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router, private toastr: ToastrService) { }
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(req).pipe(
            catchError(error => {
                if(error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 400:
                            if (error.error.errors) {
                                const modalStateError = [];
                                for (const key in error.error.errors) {
                                    modalStateError.push(error.error.errors[key]);
                                }
                                throw modalStateError;
                            } else {
                                this.toastr.error(error.statusText, error.status.toString());
                            }
                            break;
                        case 401:
                            this.toastr.error(error.statusText, error.status.toString());
                            break;
                        case 403:
                            this.toastr.error(error.statusText, error.status.toString());
                            break;
                        case 404:
                            this.router.navigateByUrl('/not-found');
                            break;
                        case 500:
                            const navigationExtras: NavigationExtras = {state: {error: error.error}}
                            this.router.navigateByUrl('/server-error', navigationExtras);
                            break;
                        default:
                            this.toastr.error('Something unexpected went wrong');
                            console.log(error);
                            break;
                    }
                }
                return throwError(error);
            })
        );
    }
}
