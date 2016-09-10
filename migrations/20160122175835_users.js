
exports.up = function(knex, Promise) {
return  Promise.all([
    knex.schema.createTable('users',function(table){
      //this is automatic incrementing on your ids, otherwise it would be manual
      table.increments();
      table.string('username');
      table.string('email');
      table.timestamps();
    }),
    knex.schema.createTable('posts',function(table){
      table.increments();
      //string limited to 255 characters
      table.string('title');
      //text is unlimited characters
      table.text('body');
      table.timestamps();
    })
  ])
};



exports.down = function(knex, Promise) {
return  Promise.all([
    knex.dropTable('users'),
    knex.dropTable('posts')
  ])
};
