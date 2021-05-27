import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StepsManagementService } from '../services/steps-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(route.url[0].path);
     return true;
    let url: string = route.url[0].path;
    if (url === this.steps.Steps.filter(x => x.order == 1)[0].route) {
      return true;
    }
    let nextStepEnabled: boolean = this.steps.Steps.filter(x => x.route == url)[0].enabled;
    if (nextStepEnabled) {
      return true;
    }
    return this.router.navigate(['appointment/' + this.steps.currentStep.route]);
  }

  constructor(private steps: StepsManagementService, private router: Router) {
  }
}
