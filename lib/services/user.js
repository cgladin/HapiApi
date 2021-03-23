'use strict';

const {Service} = require('schmervice');
const Encrypt = require('@cgladin/iut-encrypt')
const Boom = require("@hapi/boom");

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
        } catch (err) {
            return err;
        }
    }

    async login(user) {
        const {User} = this.server.models();
        try {
            const passwordBD = await User.query().findOne("email",user.email).select('password').then(o=> o.password);
            if (Encrypt.compare(user.password, passwordBD)) {
                return {login: "successful"};
            }
            return Boom.unauthorized('Authentication failed');
        } catch (err) {
            return err;
        }
    }

    patch(user) {
        const {User} = this.server.models();
        return User.query().patchAndFetchById(user.id, user);
    }
}
