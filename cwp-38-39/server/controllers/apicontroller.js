const express = require("express");

module.exports = RoutesService => {
  const router = express.Router();

  const routes = require("./routescontroller")(RoutesService);
  router.use("/routes", routes);

  return router;
};
