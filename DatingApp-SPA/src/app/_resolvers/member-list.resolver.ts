import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../_models/user";
import { UserParams } from "../_models/userParams";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";


@Injectable()
export class MemberlistResolver implements Resolve<User[]> {
    userParams: UserParams;
    
    constructor(private userSevice: UserService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userSevice.getUsers(this.userParams).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                
                return of(null);
            })
        );
    }
}