'use strict';
const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/films/fav',
    options: {
        tags: ['api'],
        auth : {
            scope: ['admin']
        },
        validate: {
            payload: Joi.object({
                titre: Joi.string().required().example("Le retour 5"),

            })
        }
    },
    handler: async (request, h) => {
        const {filmsService} = request.services();
        return filmsService.create(request.payload);
    }
};




