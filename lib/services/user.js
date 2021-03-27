'use strict';

const { Service } = require('schmervice');
const Encrypt = require('@cgladin/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');

module.exports = class UserService extends Service {
    async create(user) {

        const { User } = this.server.models();
        const { mailerService } = this.server.services();
        //mailerService.send(user);
        const mail = await User.query()
            .findOne('email', user.email)
            .select('email');
        if (!mail) {
            return User.query().insertAndFetch(user);
        }

        return Boom.notAcceptable('Email existant');
    }

    async delete(id) {

        try {
            const { User } = this.server.models();
            await User.query().deleteById(id);
            return '';
        }
        catch (err) {
            return err;
        }
    }

    async login(user) {

        const { User } = this.server.models();
        try {
            const passwordBD = await User.query()
                .findOne('email', user.email)
                .select('password')
                .then((o) => o.password);
            const scope = await User.query()
                .findOne('email', user.email)
                .select('scope')
                .then((o) => o.scope);
            if (Encrypt.compare(user.password, passwordBD)) {
                const token = Jwt.token.generate(
                    {
                        aud: 'urn:audience:iut',
                        iss: 'urn:issuer:iut',
                        email: user.email,
                        scope
                    },
                    {
                        key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                        algorithm: 'HS512'
                    },
                    {
                        ttlSec: 14400 // 4 hours
                    }
                );
                return [{ login: 'successful' } , { key: token }];
            }

            return Boom.unauthorized('Authentication failed');
        }
        catch (err) {
            return err;
        }
    }

    patch(user) {

        const { User } = this.server.models();
        return User.query().patchAndFetchById(user.id, user);
    }

    async get() {

        const { User } = this.server.models();
        return await User.query();
    }
};
