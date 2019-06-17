import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import transportsGlobal from "../store/transports";
import { Route } from "../models/Route";
import routesStoreGlobal from "../store/appstore/summarystore";
import { RoutesStore } from "../store/appstore/routesStore";
import { RoutesService } from "../services/RoutesService";
@Component({
  selector: "app-update-route",
  templateUrl: "./update-route.component.html",
  styleUrls: ["./update-route.component.css"]
})
export class UpdateRouteComponent implements OnInit {
  id: number;
  private sub: any;
  store: RoutesStore = routesStoreGlobal;
  from: string = "";
  to: string = "";
  time: number = 0;
  name: string = "";
  transport: string = transportsGlobal[0];
  transportsVariants: Array<string> = transportsGlobal;

  constructor(
    private route: ActivatedRoute,
    private routesService: RoutesService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["id"]; // (+) converts string 'id' to a number
      this.routesService.getRoute(this.id).then(res => {
        this.from = res.from;
        this.to = res.to;
        this.time = res.time;
        this.name = res.name;
        this.transport = res.transport;
      });
      // In a real app: dispatch action to load the details here.
    });
  }

  update() {
    const route = this.getRoute();
    route.id = this.id;
    this.routesService.updateRoute(route).then(res => {
      if (res !== null) {
        alert("done!");
      }
    });
  }

  getRoute() {
    let result = new Route();
    result.from = this.from;
    result.to = this.to;
    result.id = 0;
    result.name = this.name;
    result.time = this.time;
    result.transport = this.transport;
    return result;
  }
}
