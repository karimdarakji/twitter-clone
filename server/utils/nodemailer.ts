import nodemailer from "nodemailer";

export default class Mailer {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_ACCOUNT_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
      debug: true,
      logger: true,
    });
  }

  async userActivationMailTemplate({
    name,
    email,
    activationCode,
  }: {
    name: string;
    email: string;
    activationCode: string;
  }) {
    const mailOptions = {
      from: "darakjikarim@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Verify your Twitter Clone account",
      html: `
            <p>Hello ${name}</p>
            <br/>
            <p>Thank you for your interest in Twitter Clone</p>
            <br/>
            <p>To confirm your email please kindly click the verification link below.</p>
            <br/>
            <a href="${process.env.CLIENT_URL}activate?activation_code=${activationCode}">${process.env.CLIENT_URL}activate?activation_code=${activationCode}</a>
            <br/>
            <p>Cheers,</p>
            <br/>
            <p>Twitter Clone Team</p>
            `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async forgotPasswordMailTemplate({
    name,
    email,
    token,
  }: {
    name: string;
    email: string;
    token: string;
  }) {
    const mailOptions = {
      from: "darakjikarim@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Forgot Password",
      html: `
            <p>Hello ${name}</p>
            <br/>
            <p>To retrieve your password, please click this link: </p>
            <br/>
            <a href="${process.env.CLIENT_URL}reset-password?token=${token}">${process.env.CLIENT_URL}reset-password?token=${token}</a>
            <br/>
            <p>Cheers,</p>
            <br/>
            <p>Twitter Clone Team</p>
            `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
