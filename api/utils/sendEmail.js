const nodemailer = require("nodemailer");

exports.sendEmail = async (mailData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILSERVERUSR,
      pass: process.env.MAILSERVERPWD,
    },
  });

  const mailOptions = {
    from: process.env.MAILSERVERUSR,
    to: mailData.email,
    subject: mailData.subject,
    text: mailData.message,
  };

  await transporter.sendMail(mailOptions);
};
