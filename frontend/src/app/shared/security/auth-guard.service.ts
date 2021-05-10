import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UtilsService} from "../services/utils.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public utilsService: UtilsService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let canActivate = false;
    if(this.utilsService.isUserLogged()){
      canActivate = true;
    }else{
      this.utilsService.showNotification('Es necesario iniciar sesión');
      this.router.navigateByUrl('/');
    }
    return canActivate;
  }
}
