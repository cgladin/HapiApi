'use strict';

module.exports = {
    method: 'get',
    path: '/user',
    options: {
        tags: ['api'],
        auth : {
            scope: ['user','admin']
        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return userService.get();
    }
};
