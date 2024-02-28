import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const mailPoster = nodemailer.createTransport({
  service: 'Naver',
  host: 'smtp.naver.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendMail = async (userEmail, validationCode) => {
  const mailOpt = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: '배고프쥬? 인증 이메일',
    text: `아래 인증번호를 입력해 주시기 바랍니다 ${validationCode}`,
  };
  await mailPoster.sendMail(mailOpt);
};

export const generateValidationCode = (n) => {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};
