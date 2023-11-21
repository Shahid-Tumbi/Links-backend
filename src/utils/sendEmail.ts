const nodemailer = require('nodemailer');
const fs = require('fs');

import { GMAIL_SERVICE } from '../app/api/user/user.constants'
import * as path from 'path'
const sendEmail = async (email: string,name: string,sentLink:string, welcomeEmail: boolean) => {
  const htmlRAW = fs.readFileSync(
    path.join(__dirname, "../../public/templates/welcome.html"),
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
    let data = htmlRAW.replace('[userName]',name)
    message = {
      from: GMAIL_SERVICE.EMAIL_USER,
      to: email,
      subject: GMAIL_SERVICE.WELCOME_SUBJECT,
      html: data,
    }
  } else {
    let data = ForgetHtml.replace(/\$\{sentLink\}/g,sentLink)
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

