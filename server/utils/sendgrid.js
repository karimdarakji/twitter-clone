import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const sendMail = sgMail;

export const signupTemplate = ({ name, email, activationCode }) => {
  return {
    to: email, // Change to your recipient
    from: "testtwitterclone@gmail.com", // Change to your verified sender
    subject: "Verify your Twitter Clone account",
    html: `
    <p>Hello ${name}</p>
    <br/>
    <p>Thank you for your interest in Twitter Clone</p>
    <br/>
    <p>To confirm your email please kindly click the verification link below.</p>
    <br/>
    <a href="${process.env.FRONTEND_URL}activate?activation_code=${activationCode}">${process.env.BACKEND_URL}activate?activation_code=${activationCode}</a>
    <br/>
    <p>Cheers,</p>
    <br/>
    <p>Twitter Clone Team</p>
    `,
  };
};
