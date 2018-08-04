
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', table => {
    table.increments('id');
    table.string('title').notNull();
    table.text('body').notNull();
    table.string('author').notNull();
    table.string('url_title').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
