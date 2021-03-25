'use strict';

const Joi = require('joi')

module.exports = {
    method: 'post',
    path: '/user/login',
    options: {
        tags: ['api'],
        auth: false,
        validate: {
            payload: Joi.object({
                password: Joi.string().min(8).example('password').required(),
                email: Joi.string().email().example('mail@email.com').required(),
            })
        }
    },
    handler: async (request, h) => {
        const {userService} = request.services();
        return await userService.login(request.payload);
    }
};




