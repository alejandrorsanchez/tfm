import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AddListing} from "../shared/addListing";
import {AddService} from "../shared/add.service";

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.css']
})
export class AddsComponent implements OnInit {

  type: number;
  adds: AddListing[];

  constructor(private route: ActivatedRoute, private addService: AddService) {
    this.type = this.route.snapshot.params.type;
  }

  ngOnInit(): void {
    this.addService.findByType(this.type).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  isAdoption() {
    return this.type == 1;
  }
}
