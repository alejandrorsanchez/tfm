import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {SessionService} from "../services/session.service";
import {NotificationService} from "../services/notification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public sessionService: SessionService, public notificationService: NotificationService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let canActivate = false;
    if(this.sessionService.isUserLogged()){
      canActivate = true;
    }else{
      this.notificationService.showNotification('Es necesario iniciar sesión');
      this.router.navigateByUrl('/');
    }
    return canActivate;
  }
}
