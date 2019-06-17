import { Route } from "../../models/Route";

import constants from "../actionconstants/routesconstants";
import { Action } from "../Action";

export class RoutesActionsCreators {
  getRoute(id: number): Action {
    return {
      type: constants.POINTS_GET,
      payload: id
    };
  }

  getRoutes(): Action {
    return {
      type: constants.POINTS_GETALL,
      payload: {}
    };
  }

  addRoute(route: Route): Action {
    return {
      type: constants.POINTS_ADDING_PROCESS,
      payload: route
    };
  }

  deleteRoute(id: number): Action {
    return {
      type: constants.POINTS_DELETING_PROCESS,
      payload: id
    };
  }

  updateRoute(route: Route): Action {
    return {
      type: constants.POINTS_UPDATING_PROCESS,
      payload: route
    };
  }
  restoreRoute(id: number): Action {
    return {
      type: constants.POINT_RESTORE,
      payload: id
    };
  }
}
