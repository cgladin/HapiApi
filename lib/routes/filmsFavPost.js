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
                emailUser: Joi.string().required().example('mail@email.com'),
                titre: Joi.array().required().example(['Le retour 5','La momie'])
            })
        }
    },

    handler: (request) => {

        const { filmsService } = request.services();
        return filmsService.addFavourite(request.payload);
    }
};




