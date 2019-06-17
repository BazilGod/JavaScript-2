import { Component, OnInit, Input } from "@angular/core";
import { Route } from "../models/Route";
import { RoutesStore } from "../store/appstore/routesStore";
import { SnotifyService, SnotifyToastConfig } from "ng-snotify";
import { NotifierSettings } from "../models/NotifierSettings";

@Component({
  selector: "app-routing-list",
  templateUrl: "./routing-list.component.html",
  styleUrls: ["./routing-list.component.css"]
})
export class routingListComponent implements OnInit {
  @Input() routesStore: RoutesStore;
  notificationSettings: NotifierSettings = new NotifierSettings();
  constructor(private snotifyService: SnotifyService) {
    this.callbackDelete = this.callbackDelete.bind(this);
  }

  callbackDelete(id: number) {
    console.log(id)
    if (id > 0) {
      this.onDeletedSuccessfully(id);
    } else {
      this.onError("Route can not delete", "Error!");
    }
  }

  ngOnInit() {
    this.routesStore.subscribeOnDelete(this.callbackDelete);
  }

  deleteRoute(id: number) {
    this.routesStore.deleteRoute(id);
  }

  restoreDeletedRoute(id: number) {
    this.cleanNotifications();
    this.routesStore.restoreRoute(id);
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

  onDeletedSuccessfully(id: number) {
    const body: string = 'Route with name = "' + id + '" deleted!';
    const title: string = "Success!";
    const { timeout, closeOnClick, ...config } = this.getConfig();
    this.snotifyService.confirm(body, title, {
      ...config,
      buttons: [
        {
          text: "Return deleted",
          action: () => {
            this.restoreDeletedRoute(id);
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
