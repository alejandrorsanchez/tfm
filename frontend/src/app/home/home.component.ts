import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../shared/services/utils.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../shared/services/user.service";
import {User} from "../shared/models/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: string;
  username: string;

  constructor(private utilService: UtilsService, public router: Router, private activatedRoute: ActivatedRoute, private userService: UserService
              , private utilsService: UtilsService) {
    this.id = this.utilsService.getId();
  }

  ngOnInit(): void {
    this.userService.findById(this.id).subscribe(
      (response: User) => this.username = response.username
    );
  }

  logout() {
    this.utilService.destroySession();
    this.router.navigateByUrl('/');
  }
}
