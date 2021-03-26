'use strict';

module.exports = {
    method: 'delete',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        auth : {
            scope: ['admin']
        }
    },
    handler: async (request) => {

        const { userService } = request.services();
        return await userService.delete(request.params.id);
    }
};
