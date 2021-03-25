'use strict';

const Joi = require('joi')

module.exports = {
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                password: Joi.string().min(8).example('password').required(),
                email: Joi.string().email().example('mail@email.com').required(),
                username: Joi.string().min(3).example('username').required()
            })
        },
        auth : {
            scope: [ 'admin' ,'user']
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return userService.create(request.payload);
    }
};




