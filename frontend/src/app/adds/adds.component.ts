import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AddListing} from "../shared/addListing";

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {

  type: number;
  adds: AddListing[];

  constructor(private route: ActivatedRoute) {
    this.type = this.route.snapshot.params.type;
  }

  ngOnInit(): void {

  }

  contactUser() {

  }

  isAdoption() {
    return this.type == 1;
  }
}
