import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { RoutingSummaryComponent } from "./routing-summary/routing-summary.component";
import { routingFormComponent } from "./routing-form/routing-form.component";
import { routingListComponent } from "./routing-list/routing-list.component";
import { AboutComponent } from "./about/about.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { UpdateRouteComponent } from "./update-route/update-route.component";

const routes: Routes = [
  {
    path: "",
    component: routingFormComponent
  },
  {
    path: "index",
    redirectTo: "/"
  },
  {
    path: "home",
    redirectTo: "/"
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "summary",
    component: RoutingSummaryComponent
  },
  {
    path:'update/:id',
    component: UpdateRouteComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
