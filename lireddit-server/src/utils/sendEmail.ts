import nodemailer from "nodemailer";

export async function sendEmail(to: string, html: string) {
  // ethereal.email에서 테스트 SMTP 서비스 계정 생성
  // 테스트에 사용할 실제 메일 계정이 없는 경우에만 필요
  // let testAccount = await nodemailer.createTestAccount();

  // 기본 SMTP 전송을 사용하여 재사용 가능한 전송기 개체 생성
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "q7og42tml6j23md3@ethereal.email",
      pass: "FRyVnQdcBkCHeE3CJS",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: to,
    subject: "Change password",
    html,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
