'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/films/fav',
    options: {
        tags: ['api'],
        auth: {
            scope: ['user','admin']
        },
        validate: {
            payload: Joi.object({
                idUser: Joi.number().greater(0).required().example(2),
                idFilms: Joi.array().required().example([2,3,8])
            })
        }
    },

    handler: (request) => {

        const { filmsService } = request.services();
        return filmsService.addFavourite(request.payload);
    }
};




