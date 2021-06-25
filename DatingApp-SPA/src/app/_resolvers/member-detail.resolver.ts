import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";


@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userSevice: UserService,
        private router: Router, private toastr: ToastrService) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userSevice.getUser(route.params['username']).pipe(
            catchError(error => {
                this.toastr.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}