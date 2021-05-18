import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../shared/services/utils.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";
import {ComunicationService} from "../shared/services/comunication.service";
import {Comunication} from "../shared/models/comunication";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: string;
  username: string;
  notification: boolean = false;

  constructor(private utilService: UtilsService, public router: Router, private activatedRoute: ActivatedRoute, private userService: UserService
              , private utilsService: UtilsService, private comunicationService: ComunicationService) {
    this.id = this.utilsService.getId();
  }

  ngOnInit(): void {
    this.getUser();
    this.getNotifications();
  }

  getUser(){
    this.userService.findById(this.id).subscribe(
      (response: User) => this.username = response.username
    );
  }

  getNotifications(){
    this.comunicationService.findByUserId(this.id).subscribe(
      (response: Comunication[]) => {
        for (const comunication of response) {
          if(comunication.notification === Number(this.id)){
            this.notification = true;
            break;
          }
        }
      });
  }

  logout() {
    this.utilService.destroySession();
    this.router.navigateByUrl('/');
  }

  resetNotifications() {
    this.notification = false;
  }
}
