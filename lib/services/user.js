'use strict';

const {Service} = require('schmervice');

module.exports = class UserService extends Service {
    create(user) {
        const {User} = this.server.models();
        return User.query().insertAndFetch(user);
    }

    delete(id) { // .isDelete()
        try {
            const {User} = this.server.models();
            User.query().deleteById(id);
            return '';
        } catch (err){
            return err;
        }
    }
}
