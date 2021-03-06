const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // 1 ) Create a transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 2 ) Define email options
    const mailOptions = {
      from: 'admin <admin@tech4u.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    // 3 ) Send the email
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw new Error('Email not sent');
  }
};

module.exports = sendEmail;
