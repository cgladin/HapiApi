'use strict';

const Joi = require('joi');

module.exports = {
    method: 'post',
    path: '/films',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            payload: Joi.object({
                titre: Joi.string().required().example('Le retour 5'),
                description: Joi.string().example('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque nunc hendrerit arcu condimentum ultricies. Aliquam vitae ultrices odio. Nam eu vulputate dui, quis finibus ipsum.').required(),
                releaseDate: Joi.date().example('2021-03-23').required(),
                director: Joi.string().example('Jean Yves').required()
            })
        }
    },
    handler: (request) => {

        const { filmsService } = request.services();
        return filmsService.create(request.payload);
    }
};




