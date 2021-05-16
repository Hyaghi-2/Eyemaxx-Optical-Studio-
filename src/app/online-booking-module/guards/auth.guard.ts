import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StepsManagementService } from '../services/steps-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.steps.Steps.filter(x => x.route == route.url[0].path)[0]);
    // console.log(route.url[0].path);
    // console.log(this.steps.currentStep.route);

    return true;
    // if (this.steps.currentStep.validated == true) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
  }

  constructor(private steps: StepsManagementService) {
  }
}