const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

module.exports = db => {
  const RoutesService = require("./services/RoutesService")(db.Routes);
  const api = require("./controllers/apicontroller")(RoutesService);
  const app = express();
  app.use(cors())
  app.use(express.static("public"));
  app.use(bodyParser.json());
  app.use("/api", api);
  return app;
};
