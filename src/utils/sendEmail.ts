const nodemailer = require('nodemailer');
const fs = require('fs');

import { GMAIL_SERVICE } from '../app/api/user/user.constants'
import * as path from 'path'
const sendEmail = async (email: string,sentPassword:string, welcomeEmail: boolean) => {
  const htmlRAW = fs.readFileSync(
    path.join(__dirname, "../../public/templates/Welcome.html"),
    "utf8"
  );
  const ForgetHtml = fs.readFileSync(
    path.join(__dirname, "../../public/templates/forgot-password.html"),
    "utf8"
  );


// const parsedHtml = parse(htmlRAW);
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_SERVICE.EMAIL_USER,
      pass: GMAIL_SERVICE.EMAIL_PASS
    }
  });
  let message = {}
  
  if (welcomeEmail === true) {
    message = {
      from: GMAIL_SERVICE.EMAIL_USER,
      to: email,
      subject: GMAIL_SERVICE.WELCOME_SUBJECT,
      html: htmlRAW,
    }
  } else {
    let data = ForgetHtml.replace('sentPassword',sentPassword)
    message = {
      from: GMAIL_SERVICE.EMAIL_USER,
      to: email,
      subject: GMAIL_SERVICE.SUBJECT,
      html: data,
    }
  }

  await transporter.sendMail(message, (err: Error, info: string) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
      return info;
    }
  })
}

export default sendEmail;

