const express = require("express");

function RoutesController(RoutesService) {
  async function create(req, res) {
    const result = await RoutesService.create(req.body);
    res.json({ result: result });
  }

  async function readAll(req, res) {
    const result = await RoutesService.readAll();
    res.json({ result: result });
  }

  async function read(req, res) {
    const result = await RoutesService.read(req.params.id);
    res.json({ result: result });
  }

  async function update(req, res) {
    const result = await RoutesService.update(req.params.id, req.body);
    res.json({ result: result });
  }

  async function deleteF(req, res) {
    const result = await RoutesService.deleteF(req.params.id);
    res.json({ result: result });
  }

  async function restore(req, res) {
    const result = await RoutesService.restore(req.params.id);
    res.json({ result: result });
  }

  const router = express.Router();
  router.get("/", readAll);
  router.get("/:id", read);
  router.post("/create", create);
  router.post("/:id/update", update);
  router.delete("/:id", deleteF);
  router.get("/:id/restore", restore);
  return router;
}

module.exports = RoutesService => {
  const controller = new RoutesController(RoutesService);
  return controller;
};
