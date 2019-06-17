import { Component, OnInit, Input } from "@angular/core";
import transportsGlobal from "../store/transports";
import { Route } from "../models/Route";
import { RoutesStore } from "../store/appstore/routesStore";
import { Observable } from "rxjs";
import {
  SnotifyService,
  SnotifyPosition,
  SnotifyToastConfig
} from "ng-snotify";
import { NotifierSettings } from "../models/NotifierSettings";

@Component({
  selector: "app-add-route",
  templateUrl: "./add-route.component.html",
  styleUrls: ["./add-route.component.css"]
})
export class AddRouteComponent implements OnInit {
  @Input() routesStore: RoutesStore;
  from: string = "";
  to: string = "";
  time: number = 0;
  name: string = "";
  transport: string = transportsGlobal[0];
  transportsVariants: Array<string> = transportsGlobal;

  notificationSettings: NotifierSettings = new NotifierSettings();
  constructor(private snotifyService: SnotifyService) {
    this.callbackAdd = this.callbackAdd.bind(this);
  }

  callbackAdd(result: Route) {
    if (result) {
      this.from = "";
      this.to = "";
      this.time = 0;
      this.name = "";
      this.transport = transportsGlobal[0];
      this.onAddedSuccessfully(result);
    } else {
      this.onError("Route can not added", "Error!");
    }
  }

  ngOnInit() {
    this.routesStore.subscribeOnAdd(this.callbackAdd);
  }

  addRoute() {
    const route = this.getRoute();
    this.routesStore.addRoute(route);
  }

  subscriber(routes: Array<Route>, action: string, flag: any) {}

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

  deleteAddedRoute(id: number) {
    this.routesStore.deleteAdded(id);
    this.cleanNotifications();
    this.onSuccess("Returning done!", "Success!");
  }

  // methods of notification
  getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.notificationSettings.newTop,
        maxAtPosition: this.notificationSettings.blockMax,
        maxOnScreen: this.notificationSettings.dockMax
      }
    });
    return {
      bodyMaxLength: this.notificationSettings.bodyMaxLength,
      titleMaxLength: this.notificationSettings.titleMaxLength,
      backdrop: this.notificationSettings.backdrop,
      position: this.notificationSettings.position,
      timeout: this.notificationSettings.timeout,
      showProgressBar: this.notificationSettings.progressBar,
      closeOnClick: this.notificationSettings.closeClick,
      pauseOnHover: this.notificationSettings.pauseHover
    };
  }

  onSuccess(body: string, title: string) {
    this.snotifyService.success(body, title, this.getConfig());
  }

  onError(body: string, title: string) {
    this.snotifyService.error(body, title, this.getConfig());
  }

  onAddedSuccessfully(route: Route) {
    const body: string = 'Route with name = "' + route.name + '" added!';
    const title: string = "Success!";
    const { timeout, closeOnClick, ...config } = this.getConfig();
    this.snotifyService.confirm(body, title, {
      ...config,
      buttons: [
        {
          text: "Delete created",
          action: () => {
            this.deleteAddedRoute(route.id);
          },
          bold: false
        }
      ]
    });
  }

  cleanNotifications() {
    this.snotifyService.clear();
  }
}
