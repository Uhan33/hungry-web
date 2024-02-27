import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

function generateRandomCode(n) {
  let str = '';
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}
async function mailSender() {
  const validation = generateRandomCode(6);
  const mailPoster = nodemailer.createTransport({
    service: 'Naver',
    host: 'smtp.naver.com',
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: '배고프쥬? 인증 이메일',
    text: `아래 인증번호를 입력해 주시기 바랍니다
            ${validation}`,
  };

  mailPoster.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('에러' + error);
    } else {
      console.log('전송 완료' + info.response);
    }
  });
}
export default mailSender;
