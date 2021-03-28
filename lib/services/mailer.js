'use strict';

const { Service } = require('schmervice');
const Nodemailer = require('nodemailer');

module.exports = class MailerService extends Service {

    createTransporter() {

        return Nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD
            }
        });
    }

    async send(user) {

        const transporter = this.createTransporter();
        await transporter.sendMail({
            from: process.env.MAILER_FROM,
            to: user.email,
            subject: 'Bienvenue',
            text: 'Bienvenue ' + user.firstName + ' ' + user.lastName
        });
    }

    async filmCreateNotification(titre) {

        const transporter = this.createTransporter();
        const { User } = this.server.models();
        const users = await User.query().select('email');
        const emails = this.concatUserEmail(users);

        await transporter.sendMail({
            from: process.env.MAILER_FROM,
            to: emails,
            subject: 'New Film add',
            text: 'Un nouveau film vien d\'être ajouté : ' + titre
        });
    }
    async filmUpdateNotification(film) {

        const transporter = this.createTransporter();

        const { User } = this.server.models();
        const users = await User.query().select('email').join('favouriteFilms', 'user.id', '=', 'favouritefilms.idUser').where('favouritefilms.idFilm',film.id);
        const emails = this.concatUserEmail(users);

        await transporter.sendMail({
            from: process.env.MAILER_FROM,
            to: emails ,
            subject: 'Film Modifié',
            text: 'Un film vien d\'être modifé : ' + film.titre
        });
    }
    concatUserEmail(users) {

        let usersEmail = '';
        let firstelement = true;
        for (const i in users) {
            if (!firstelement) {
                usersEmail += ', ';
            }
            else {
                firstelement = false;
            }

            usersEmail += users[i].email;
        }

        return usersEmail;
    }
};
