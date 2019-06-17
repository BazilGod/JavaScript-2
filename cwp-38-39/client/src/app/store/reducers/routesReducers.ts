import { RoutesStore } from "../appstore/routesStore";
import { Route } from "../../models/Route";

import constants from "../actionconstants/routesconstants";
import { RoutesService } from "../../services/RoutesService";
import { RequestsService } from "../../services/RequestsService";
import { Action } from "../Action";

const routesService = new RoutesService(new RequestsService());
async function routesReducer(oldState: Array<Route>, action: Action) {
  switch (action.type) {
    case constants.POINTS_ADDING_PROCESS: {
      const route = action.payload as Route;
      const res = await routesService.addRoute(
        route.name,
        route.from,
        route.to,
        route.time,
        route.transport
      );
      return res;
    }
    case constants.POINTS_DELETING_PROCESS: {
      const route = await routesService.removeRoute(action.payload as number);
      return route;
    }
    case constants.POINTS_UPDATING_PROCESS: {
      const result = await routesService.updateRoute(action.payload as Route);
      return result;
    }
    case constants.POINTS_GET: {
    }
    case constants.POINTS_GETALL: {
      const result = await routesService.getRoutes();
      return result;
    }
    case constants.POINT_RESTORE: {
      const result = await routesService.restoreRoute(action.payload);
      return result;
    }
    default: {
      return oldState;
    }
  }
}

export default routesReducer;
