const nodemailer = require('nodemailer');

const htmlTemplate =
  '<div style="font-family: Verdana;display: flex;justify-content: center;align-items: center;flex-direction: column;height: 100vh;margin: 0;background-color: #f4f4f4;padding: 20px;"><img src="https://img.freepik.com/free-vector/social-team-helping-charity-sharing-hope_74855-6660.jpg?w=740&t=st=1660832756~exp=1660833356~hmac=2bfd07cb5fac91f98af21b6034a0e23470b91a4e5006c6b392d7e58a02a5e3f" alt="" style="width: 50%;height: auto;"><h1>Thank you!</h1><p style="padding-bottom: 20px;">You will hear from us soon!</p></div></html>';

const sendEmail = async (email, subjectText) => {
  const account = await nodemailer.createTestAccount();
  const testTransporter = {
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  };
  const proTransporter = {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  };
  const transporter = nodemailer.createTransport(
    process.env.IS_JEST ? testTransporter : proTransporter
  );
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
