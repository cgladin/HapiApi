'use strict';

const { Service } = require('schmervice');
const Boom = require('@hapi/boom');

module.exports = class FilmsService extends Service {
    async create(film) {

        const { Films } = this.server.models();
        const { mailerService } = this.server.services();
        await mailerService.filmCreateNotification(film.titre);
        return 'd';
        const titre = await Films.query().findOne('titre', film.titre).select('titre');
        if (!titre) {
            return Films.query().insertAndFetch(film);
        }

        return Boom.notAcceptable('Ce film existe déjà');
    }

    async delete(id) {

        try {
            const { Films,FavouriteFilms } = this.server.models();
            const fav = FavouriteFilms.query().findOne('idFilm',id);
            if (fav) {
                await FavouriteFilms.query().delete().where('idFilm',id);
            }

            await Films.query().deleteById(id);
            return '';
        }
        catch (err) {
            return err;
        }
    }

    async patch(film) {

        const { Films } = this.server.models();
        const { mailerService } = this.server.services();
        await mailerService.filmUpdateNotification(film);
        return Films.query().patchAndFetchById(film.id, film);
    }

    async addFavourite(payload) {

        const { FavouriteFilms } = this.server.models();
        const error = [];
        const success = [];
        for (const idFilm of payload.idFilms) {
            const fav = await FavouriteFilms.query().findOne({ idUser: payload.idUser, idFilm });
            if (!fav) {
                success.push(idFilm);
                await FavouriteFilms.query().insert({ idUser: payload.idUser, idFilm });
            }
            else {
                error.push(idFilm);
            }
        }

        if ( error.length > 0 ) {
            return { statusCode: 406, error: 'Not Acceptable', alreadyFavourite: error, addSuccessFulOn: success };
        }

        return { add: 'successful' };
    }

    async deleteFavourite(idUser, idFilms) {

        const { FavouriteFilms, User } = this.server.models();
        const error = [];
        const success = [];
        const user = await User.query().findById(idUser);
        if (user) {
            for (const idFilm of idFilms) {
                const verify = FavouriteFilms.query().findOne({ idUser, idFilm });
                if (verify) {
                    success.push(idFilm);
                    await FavouriteFilms.query().delete().where('idUser', idUser).andWhere('idFilm', idFilm);
                }
                else {
                    error.push(idFilm);
                }
            }

            if (error.length > 0) {
                return { deleteSuccessOnIdFilm: success, idFilmNotFoundOn: error };
            }

            return { delete: 'successful' };
        }

        return Boom.notFound('User Not Found');
    }
};
