'use strict';

const Joi = require('joi');
const { Model } = require('schwifty');

const Encrypt = require('@cgladin/iut-encrypt');

module.exports = class User extends Model {

    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            password: Joi.string().min(8).description('Password of the User'),
            email: Joi.string().email().example('email@email.com').description('email'),
            username: Joi.string().min(3).example('username').description('username'),
            scope: Joi.string().example('admin')
        });
    }

    $beforeInsert(queryContext) {

        this.password = Encrypt.encrypt(this.password);
        this.scope = 'user';
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        if (this.password) {
            this.password = Encrypt.encrypt(this.password);
        }

        this.updatedAt = new Date();
    }

};

