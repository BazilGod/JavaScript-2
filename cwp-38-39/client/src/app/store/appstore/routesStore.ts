import { Route } from "../../models/Route";
import { RoutesActionsCreators } from "../actionbuilders/routesactioncreators";

const creators: RoutesActionsCreators = new RoutesActionsCreators();
import routesReducer from "../reducers/routesreducers";

export class RoutesStore {
  routes: Array<Route> = [];
  action: string = null;
  helperFlag: any = "";
  subscribersOnAdd: Array<any> = [];
  subscribersOnDelete: Array<any> = [];
  subscribersOnUpdateRoutes: Array<any> = [];

  isActionDoint() {
    return this.action !== null;
  }

  async addRoute(route: Route) {
    const oldRoutes = [...this.routes];

    this.routes = [...this.routes, route];

    const action = creators.addRoute(route);
    const res = await routesReducer(this.routes, action);
    if (res) {
      this.routes = [...oldRoutes, res];
    } else {
      this.routes = [...oldRoutes];
    }

    this.notifyAdd(res);
  }
  subscribeOnAdd(method: any) {
    this.subscribersOnAdd.push(method);
  }

  notifyAdd(result: Route) {
    this.subscribersOnAdd.forEach(element => {
      element(result);
    });
    this.notifyUpdateRoutes();
  }
  subscribeOnDelete(method: any) {
    this.subscribersOnDelete.push(method);
  }

  notifyDelete(id: number) {
    this.subscribersOnDelete.forEach(element => {
      element(id);
    });
  }
  subscribeOnUpdateRoutes(method: any) {
    this.subscribersOnUpdateRoutes.push(method);
  }

  notifyUpdateRoutes() {
    this.subscribersOnUpdateRoutes.forEach(element => {
      element(this.routes);
    });
  }

  async getRoutes() {
    const action = creators.getRoutes();
    const result = await routesReducer(this.routes, action);
    this.routes = [...result];
    this.notifyUpdateRoutes();
    this.updateSorting();
  }

  async updateRoute(route: Route) {
    const action = creators.updateRoute(route);
    const result = await routesReducer(this.routes, action);

    this.routes = [...this.routes.filter(x => x.id != route.id), route];
    this.updateSorting();
  }

  async restoreRoute(id: number) {
    const action = creators.restoreRoute(id);
    const result = (await routesReducer(this.routes, action)) as Route;
    if (result !== null) {
      this.routes = [...this.routes, result];
    }
    this.updateSorting();
    this.notifyUpdateRoutes();
  }

  async deleteRoute(id: number) {
    const action = creators.deleteRoute(id);
    const result = (await routesReducer(this.routes, action)) as number;
    if (result > 0) {
      this.routes = [...this.routes.filter(el => el.id != id)];
      this.notifyUpdateRoutes();
      this.notifyDelete(id);
      return;
    }

    this.notifyDelete(-1);
  }

  async deleteAdded(id: number) {
    const action = creators.deleteRoute(id);
    await routesReducer(this.routes, action);
    this.routes = [...this.routes.filter(el => el.id != id)];
    this.notifyUpdateRoutes();
  }

  updateSorting() {
    this.routes.sort(this.compare);
  }

  compare(a: Route, b: Route) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }
}
