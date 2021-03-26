'use strict';

module.exports = {
    method: 'delete',
    path: '/films/{id}',
    options: {
        tags: ['api'],
        auth : {
            scope: ['admin']
        }
    },
    handler: async (request) => {

        const { filmsService } = request.services();
        return await filmsService.delete(request.params.id);
    }
};
