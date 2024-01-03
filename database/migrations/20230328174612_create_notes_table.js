const { timestamps, onUpdateTrigger } = require("../utils");
exports.up = async function (knex) {
  const migration = await knex.schema.createTable("notes", function (table) {
    table.bigIncrements("id");
    table.string("ulid");
    table.string("description");
    table.tinyint("status").index();
    table.bigInteger("createdBy").index();
    timestamps(knex, table);
  });
  await knex.raw(onUpdateTrigger("notes"));
  return migration;
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notes");
};
