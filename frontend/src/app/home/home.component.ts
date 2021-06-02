import { Component, OnInit } from '@angular/core';
import {SessionService} from "../shared/services/session.service";
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

  constructor(private sessionService: SessionService, public router: Router, private activatedRoute: ActivatedRoute,
              private userService: UserService, private comunicationService: ComunicationService) {
    this.id = this.sessionService.getId();
  }

  ngOnInit(): void {
    this.getUser();
    this.getNotifications();
  }

  getUser(): void {
    this.userService.findById(this.id).subscribe(
      (user: User) => this.username = user.username);
  }

  getNotifications(): void {
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

  resetNotifications(): void {
    this.notification = false;
  }

  logout(): void {
    this.sessionService.destroySession();
    this.router.navigateByUrl('/');
  }
}
