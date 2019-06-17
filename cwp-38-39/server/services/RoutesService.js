function RoutesService(Items) {
  async function readAll() {
    return await Items.findAll({
      attributes: ["id", "name", "time", "transport", "from", "to"]
    });
  }

  async function read(id) {
    return await Items.findById(id, {
      attributes: ["id", "name", "time", "transport", "from", "to"]
    });
  }

  async function create(body) {
    if (Rand()) {
      const name = body.name;
      const time = body.time;
      const transport = body.transport;
      const from = body.from;
      const to = body.to;
      const item = await Items.create({ name, time, transport, from, to });
      const temp = await item.get({ plaint: true });
      const result = await read(temp.id);
      return { item: result };
    } else {
      return { item: null };
    }
  }

  async function deleteF(id) {
    return await Items.destroy({ where: { id: id } });
  }

  async function restore(id) {
    await Items.update(
      { deletedAt: null },
      { where: { id: id }, limit: 1, paranoid: false }
    );
    return await read(id);
  }

  async function update(id, body) {
    const name = body.name;
    const time = body.time;
    const transport = body.transport;
    const from = body.from;
    const to = body.to;
    const item = { name, time, transport, from, to };
    await Items.update(item, { where: { id: id }, limit: 1 });
    return await read(id);
  }

  function Rand() {
    return Math.random() >= 0.5;
  }
  return { read, readAll, create, deleteF, update, restore };
}
module.exports = RoutesService;
