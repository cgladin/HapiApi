'use strict';

module.exports = {
    method: 'patch',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        auth : {
            scope: [ 'admin' ]
        }
    },
    handler: async (request, h) => {

        const {User} = request.models();

        const users = await User.query();

        return users;
    }
};
