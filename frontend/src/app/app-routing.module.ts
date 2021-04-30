import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuardService} from "./shared/auth-guard.service";
import {CoverComponent} from "./cover/cover.component";
import {OperationsComponent} from "./operations/operations.component";
import {ProfileComponent} from "./profile/profile.component";
import {PublisherComponent} from "./publisher/publisher.component";
import {MyAddsComponent} from "./my-adds/my-adds.component";

const routes: Routes = [
  {path: '', component: CoverComponent},
  {path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {path: '', component: OperationsComponent},
      {path: 'adds', component: MyAddsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'publish', component: PublisherComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
