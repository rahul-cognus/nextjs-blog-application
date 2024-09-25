const nodemailer = require('nodemailer');

exports.sendEmail = async (mailData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 't1129172@gmail.com',
            pass: 'password',
        },
    })

    const mailOptions = {
        from: 'Admin <admin@example.com>',
        to: mailData.email,
        subject: mailData.subject,
        text: mailData.message,
    };

    await transporter.sendMail(mailOptions);
}