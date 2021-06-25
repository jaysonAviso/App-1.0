import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { LoginUser } from '../_models/loginUser';
import { AuthService } from '../_services/auth.service';
@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: LoginUser;

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>, 
        private authService: AuthService) {
          this.authService.currentUser$.pipe(take(1)).subscribe(user => {
            this.user = user;
          })
         }

  ngOnInit(): void {
    // clear view if no roles
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }
    if (this.user?.roles.some(r => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }else {
      this.viewContainerRef.clear();
    }
  }

}
