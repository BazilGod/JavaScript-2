import { Component, OnInit, Input } from "@angular/core";

import transportsGlobal from "../store/transports";
import { Route } from "../models/Route";
import { RoutesStore } from "../store/appstore/routesStore";
import { TransportUsingModel } from "../models/TransportUsingModel";

@Component({
  selector: "app-routing-summary-header",
  templateUrl: "./routing-summary-header.component.html",
  styleUrls: ["./routing-summary-header.component.css"]
})
export class RoutingSummaryHeaderComponent implements OnInit {
  @Input() routesStore: RoutesStore;
  routes: Array<Route>;
  timeSummary: number;
  transports: Array<TransportUsingModel>;
  constructor() {
    this.subscriberOnNewRoutes = this.subscriberOnNewRoutes.bind(this);
  }

  ngOnInit() {
    this.routesStore.subscribeOnUpdateRoutes(this.subscriberOnNewRoutes);
    return this.routesStore.getRoutes().then(() => {
      this.updateAllInfo();
    });
  }
  updateAllInfo() {
    this.routes = this.routesStore.routes;
    this.transports = [];
    transportsGlobal.forEach(el => {
      this.transports.push(new TransportUsingModel(el, 0));
    });

    this.setSummaryTime();
  }
  subscriberOnNewRoutes(routes: Array<Route>) {
    this.routes = [...routes];
    this.updateAllInfo();
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
