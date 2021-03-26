'use strict';

const { Service } = require('schmervice');
const Boom = require('@hapi/boom');

module.exports = class FilmsService extends Service {
    async create(film) {

        const { Films } = this.server.models();
        const { mailerService } = this.server.services();
        //mailerService.send(film);
        const titre = await Films.query().findOne('titre', film.titre).select('titre');
        if (!titre) {
            return Films.query().insertAndFetch(film);
        }

        return Boom.notAcceptable('Ce film existe déjà');
    }

    async delete(id) {

        try {
            const { Films } = this.server.models();
            await Films.query().deleteById(id);
            return '';
        } catch (err) {
            return err;
        }
    }

    async patch(film) {

        const { Films } = this.server.models();
        return await Films.query().patchAndFetchById(film.id, film);
    }

    async addFavourite(payload) {

        const { FavouriteFilms, Films, User } = this.server.models();
        const idUser = await User.query().findOne('email', payload.emailUser).select('id');
        if (idUser) {
            let error = [];
            for (const titre of payload.titre) {
                const idFilm = await Films.query().findOne('titre', titre).select('id');
                if (idFilm) {
                    const fav = await FavouriteFilms.query().findOne('idFilm',idFilm.id);
                    if(!fav) {
                        await FavouriteFilms.query().insert({ idUser: idUser.id, idFilm: idFilm.id });
                    } else {
                        error.push(titre) ;
                    }
                }
            }

            if(error.length > 0){
                return{ statusCode: 406, error: "Not Acceptable", alreadyFavourite: error, add: 'successful' };
            }
            return { add: 'successful' };
        }

        return Boom.notAcceptable('Email inconnue');
    }
};
