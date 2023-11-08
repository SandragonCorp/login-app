import nodemailer from "nodemailer";

// the interface that is needed to send a mail
interface MailerConfig {
    from: string
    to: string
    subject: string
    html: string
}

// config that only exposes needed properties
export interface MailerSupportConfig {
    from: string
    html: string
}

export const Mailer = {
    sendMailToSupport: async (config: MailerSupportConfig) => {
        const newConfig = {
            ...config,
            subject: "SUPPORT - " + config.from,
            to: process.env.EMAILER_ADDRESS_SUPPORT
        } as MailerConfig;

        Mailer.sendMail(newConfig);
    },
    sendMail: async (config: MailerConfig) => {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAILER_AUTH_USER,
              pass: process.env.EMAILER_AUTH_PASSWORD,
            },
          });

        const info = await transporter.sendMail(config);
    }
}