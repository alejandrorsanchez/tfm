import { Component, OnInit } from '@angular/core';
import {UtilsService} from "../shared/utils.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;

  constructor(private utilService: UtilsService, public router: Router) {
    this.username = 'NombreUsuario';
  }

  ngOnInit(): void {}

  logout() {
    this.utilService.destroySession();
    this.router.navigateByUrl('/');
  }
}
