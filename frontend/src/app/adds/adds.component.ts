import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {

  type: number;
  adds: any;
  adds1 = [{username: "Alex", pet: "Simba", address: "address1"}, {username: "Celia", pet: "Coco", address: "address2"}];
  adds2 = [{username: "Dani", description: "soy el mejor", address: "address1"}, {username: "Sara", description: "me gusta cuidar", address: "address2"}];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    this.type == 1 ? this.adds = this.adds1 : this.adds = this.adds2;
  }

  contactUser() {

  }

  isAdoption() {
    return this.type == 1;
  }
}
