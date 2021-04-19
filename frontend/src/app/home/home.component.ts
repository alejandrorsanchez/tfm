import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../shared/utils.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {User} from "../user/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  id: number;
  username: string;

  constructor(private utilService: UtilsService, public router: Router, private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.id = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.userService.findById(this.id).subscribe(
      response => {
        this.user = response[0];
        this.username = this.user.username;
      }
    );
  }

  logout() {
    this.utilService.destroySession();
    this.router.navigateByUrl('/');
  }
}
