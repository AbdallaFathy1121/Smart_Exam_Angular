import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map, take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  toastr: ToastrService = inject(ToastrService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        if (user != null) {
          const isAuthorized = user.roles.includes(route.data['role']);
          if (!isAuthorized) {
            this.router.createUrlTree(['/']);
            this.toastr.error('You are not Authorized');
          }
          return isAuthorized;
        } else {
          return this.router.createUrlTree(['/auth/login']);
        }
      })
    );
  }
}
