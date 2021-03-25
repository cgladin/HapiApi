'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favouriteFilms', (table) => {
            table.integer('idUser').notNull();
            table.integer('idFilm').notNull();
            table.primary(['idUser', 'idFilm']);
        });
    },

    async down(knex) {
        await knex.schema.dropTableIfExists('favouriteFilms');
    }
};
