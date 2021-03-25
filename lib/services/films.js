'use strict';

const {Service} = require('schmervice');
const Boom = require("@hapi/boom");

module.exports = class FilmsService extends Service {
    async create(films) {
        const {Films} = this.server.models();
        const {mailerService} = this.server.services();
        mailerService.send(films);
        const mail= await Films.query().findOne("email",films.email).select('email');
        if(!mail) {
            return Films.query().insertAndFetch(films);
        }
        return Boom.notAcceptable("Email existant")  ;
    }
}
