'use strict';

module.exports = {
    method: 'delete',
    path: '/user/{id}',
    options: {
        tags: ['api'],
    },
    handler: async (request, h) => {
        const { userService } = request.services();
        return await userService.delete(request.params.id);
    }
};
