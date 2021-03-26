'use strict';

const Joi = require('joi');
const { Model } = require('schwifty');

module.exports = class Films extends Model {

    static get tableName() {

        return 'films';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            titre: Joi.string(),
            description: Joi.string().min(3).example('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque nunc hendrerit arcu condimentum ultricies. Aliquam vitae ultrices odio. Nam eu vulputate dui, quis finibus ipsum.'),
            releaseDate: Joi.date().example('2021-03-23'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            director: Joi.string().min(3)
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};

