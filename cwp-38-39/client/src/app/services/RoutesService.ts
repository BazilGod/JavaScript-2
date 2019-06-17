import { RequestsService } from "./RequestsService";
import { Injectable } from "@angular/core";
import { Route } from "../models/Route";
const baseAddress = "/api/routes";

@Injectable({
  providedIn: "root"
})
export class RoutesService {
  constructor(private requestsService: RequestsService) {}
  async getRoutes() {
    const result = await this.requestsService.get(baseAddress);
    return result;
  }
  async getRoute(id: number) {
    const result = await this.requestsService.get(baseAddress + "/" + id);
    return result;
  }

  async removeRoute(id) {
    const result = await this.requestsService.delete(baseAddress + "/" + id);
    return result;
  }

  async addRoute(name, from, to, time, transport) {
    const result = await this.requestsService.post(baseAddress + "/create", {
      name,
      from,
      to,
      time,
      transport
    });
    return result.item;
  }

  async updateRoute(obj: Route) {
    const result = await this.requestsService.post(
      baseAddress + "/" + obj.id + "/update",
      obj
    );
    return result;
  }

  async restoreRoute(id) {
    const result = await this.requestsService.get(
      baseAddress + "/" + id + "/restore"
    );
    return result;
  }
}
