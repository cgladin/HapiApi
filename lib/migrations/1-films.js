'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('films', (table) => {

            table.increments('id').primary();
            table.string('titre').notNull();
            table.string('description').notNull();
            table.dateTime('releaseDate').notNull();
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
            table.string('director').notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('films');
    }
};
