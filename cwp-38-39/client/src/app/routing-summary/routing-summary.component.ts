import { Component, OnInit, Input } from "@angular/core";

import transportsGlobal from "../store/transports";
import { Route } from "../models/Route";
import { RoutesStore } from "../store/appstore/routesStore";

import storeGlobal from "../store/appstore/summarystore";
import { TransportUsingModel } from "../models/TransportUsingModel";

@Component({
  selector: "app-routing-summary",
  templateUrl: "./routing-summary.component.html",
  styleUrls: ["./routing-summary.component.css"]
})
export class RoutingSummaryComponent implements OnInit {
  routesStore: RoutesStore = storeGlobal;
  routes: Array<Route>;
  timeSummary: number;
  transports: Array<TransportUsingModel>;
  constructor() {}

  ngOnInit() {
    return this.routesStore.getRoutes().then(() => {
      this.routes = this.routesStore.routes;
      this.transports = [];
      transportsGlobal.forEach(el => {
        this.transports.push(new TransportUsingModel(el, 0));
      });

      this.setSummaryTime();
      return 0;
    });
  }

  setSummaryTime() {
    this.timeSummary = 0;
    this.routes.forEach(el => {
      this.timeSummary += el.time;
      this.addTransport(el.transport);
    });
  }

  addTransport(transport: string) {
    let flag: boolean = false;
    this.transports.forEach(element => {
      if (element.transport == transport) {
        flag = true;
        element.usages++;
      }
    });

    if (!flag) {
      this.transports.push(new TransportUsingModel(transport, 1));
    }
  }
}
