'use strict';

const { Service } = require('schmervice');
const Nodemailer = require('nodemailer');

module.exports = class MailerService extends Service {
    async send(user) {

        const transporter = Nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: process.env.MAILER_FROM,
            to: user.email,
            subject: 'Bienvenue',
            text: 'Bienvenue ' + user.firstName + ' ' + user.lastName
        });
    }
};
