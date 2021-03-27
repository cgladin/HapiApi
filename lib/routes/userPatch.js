'use strict';

const Joi = require('joi');

module.exports = {
    method: 'patch',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin']
        },
        validate: {
            payload: Joi.object({
                id: Joi.number().required(),
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().min(8).example('password'),
                email: Joi.string().email().example('mail@email.com'),
                username: Joi.string().min(3).example('username'),
                scope: Joi.string()
            })
        }
    },
    handler: (request) => {

        const { userService } = request.services();
        return userService.patch(request.payload);
    }
};
