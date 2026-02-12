import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../logger/logger.js'

dotenv.config();

const transporter = nodemailer.createTransport({
    host: `${process.env.EMAIL_HOST}`,
    port: `${process.env.EMAIL_PORT}`,
    secure: false,
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`
    }
});

const message = (url, service) => {

    return {
        from: process.env.EMAIL_USER,
        to: "oliveiraruan2018@gmail.com",
        subject: `Alerta: ${service} está offline!`,
        html: `
            <!DOCTYPE html>
            <html>
                <head>
                    <style>
                        body {
                                margin: 0;
                                padding: 0;
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: auto;
                                background: #ffffff;
                                border-radius: 8px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                                overflow: hidden;
                            }
                            .header {
                                background: #FF0000;
                                color: white;
                                text-align: center;
                                padding: 20px;
                                font-size: 24px;
                            }
                            .body {
                                padding: 20px;
                                color: #333333;
                                line-height: 1.6;
                            }
                            .footer {
                                text-align: center;
                                background: #eeeeee;
                                padding: 10px;
                                font-size: 12px;
                                color: #777777;
                            }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            Alerta: ${service} está offline!   
                        </div>
                        <div class="body">
                            <p> Verificar o serviço ${url} que está offline</p>
                        </div>
                    </div>
                </body>
            </html>
        `
    }
};

async function sendEmail(url, service) {
    await transporter.sendMail(message(url, service), (err, info) => {
        logger.info(`Enviando email de alerta para: ${message.to}` );
        if (err) {
            logger.error("Erro ao enviar email: " + err.message);
        } else {
            logger.info("Email enviado com sucesso: " + info.response);
        }
    });
}

export default sendEmail;