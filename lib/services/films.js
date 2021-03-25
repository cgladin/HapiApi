'use strict';
const {Service} = require('schmervice');
const Boom = require("@hapi/boom");

module.exports = class FilmsService extends Service {
    async create(film) {
        const {Films} = this.server.models();
        const {mailerService} = this.server.services();
        //mailerService.send(film);
        const titre = await Films.query().findOne("titre",film.titre).select('titre');
        if(!titre) {
            return Films.query().insertAndFetch(film);
        }
        return Boom.notAcceptable('Ce film existe déjà')
    }
    async delete(id) { // .isDelete()
        try {
            const {Films} = this.server.models();
            await Films.query().deleteById(id);
            return '';
        } catch (err) {
            return err;
        }
    }
    async patch(film) {
        const {User} = this.server.models();
        return User.query().patchAndFetchById(film.id, film);
    }

}
