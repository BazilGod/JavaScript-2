import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RoutingSummaryComponent } from "./routing-summary/routing-summary.component";
import { routingFormComponent } from "./routing-form/routing-form.component";
import { routingListComponent } from "./routing-list/routing-list.component";

import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { AboutComponent } from "./about/about.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AddRouteComponent } from "./add-route/add-route.component";

import { SnotifyModule, SnotifyService, ToastDefaults } from "ng-snotify";
import { RoutingSummaryHeaderComponent } from './routing-summary-header/routing-summary-header.component';
import { UpdateRouteComponent } from './update-route/update-route.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingSummaryComponent,
    routingFormComponent,
    routingListComponent,
    HeaderComponent,
    AboutComponent,
    NotFoundComponent,
    AddRouteComponent,
    RoutingSummaryHeaderComponent,
    UpdateRouteComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, SnotifyModule],
  providers: [
    { provide: "SnotifyToastConfig", useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
