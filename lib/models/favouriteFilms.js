'use strict';
const Joi = require('joi');
const {Model} = require('schwifty');

module.exports = class FavouriteFilms extends Model {

    static get tableName() {
        return 'favouriteFilms';
    }

    static get joiSchema() {
        return Joi.object({
            idUser: Joi.number(),
            idFilm: Joi.number(),
        });
    }
};

