import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  publishAdd() {
    this.router.navigateByUrl('home/publish');
  }
}
