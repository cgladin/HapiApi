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

        const {User} = request.models();

        const users = await User.query();

        return users;
    }
};
