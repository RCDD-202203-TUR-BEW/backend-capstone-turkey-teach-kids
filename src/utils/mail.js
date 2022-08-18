const nodemailer = require('nodemailer');

const htmlTemplate =
  '<body><img src="https://img.freepik.com/free-vector/social-team-helping-charity-sharing-hope_74855-6660.jpg?w=740&t=st=1660832756~exp=1660833356~hmac=2bfd07cb5fac91f98af21b6034a0e23470b91a4e5006c6b392d7e58a02a5e3f" alt="" class="img"><h1>Thank you!</h1><p>You will hear from us soon!</p></body></html>';

const sendEmail = async (email, subjectText) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.EMAIL_ID, // sender address
    to: email, // list of receivers
    subject: subjectText, // Subject line
    text: '', // plain text body
    html: htmlTemplate, // html body
  });
  return info;
};

module.exports = sendEmail;
