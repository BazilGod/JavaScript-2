import { RoutesStore } from "./routesStore";
import { Route } from "../../models/Route";
import transports from "../transports";
const store = new RoutesStore();
store.routes = [];
// for mock tests
/*for (let i = 0; i < 10; i++) {
  let route: Route = new Route();
  (route.from = "from " + i), (route.to = "to " + (i + 1));
  route.id = i;
  route.name = "route " + i;
  route.transport = transports[i % transports.length];
  store.routes.push(route);
}*/

export default store;
