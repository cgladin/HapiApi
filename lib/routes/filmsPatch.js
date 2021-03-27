'use strict';

const Joi = require('joi');

module.exports = {
    method: 'patch',
    path: '/films',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            payload: Joi.object({
                id: Joi.number().required(),
                titre: Joi.string().example('Le retour 5'),
                description: Joi.string().example('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pellentesque nunc hendrerit arcu condimentum ultricies. Aliquam vitae ultrices odio. Nam eu vulputate dui, quis finibus ipsum.'),
                releaseDate: Joi.date().example('2021-03-23'),
                director: Joi.string().example('Jean Yves')
            })
        }
    },
    handler: (request) => {

        const { filmsService } = request.services();
        return filmsService.patch(request.payload);
    }
};
