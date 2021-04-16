import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuardService} from "./shared/auth-guard.service";
import {CoverComponent} from "./cover/cover.component";
import {OperationsComponent} from "./operations/operations.component";

const routes: Routes = [
  {path: '', component: CoverComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService],
    children: [
      {path: '', component: OperationsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
