import { Component, OnInit, Input } from "@angular/core";
import { RoutesStore } from "../store/appstore/routesStore";

import storeGlobal from "../store/appstore/summarystore";
import { Route } from "../models/Route";


@Component({
  selector: "app-routing-form",
  templateUrl: "./routing-form.component.html",
  styleUrls: ["./routing-form.component.css"]
})
export class routingFormComponent implements OnInit {
  store: RoutesStore;
  constructor() {
    this.store = storeGlobal;
    this.store.getRoutes();
  }

  ngOnInit() {
  }
}
