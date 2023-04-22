const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const emailVerificationSender = async (data) => {
  try {
    const sendConfig = {
      to: data.email,
      from: "novator0511@gmail.com",
      subject: "Email verification",
      html: `<p>Please click on the <a target="_blank" href="${BASE_URL}/users/verify/${data.verificationToken}">LINK</a> to verify your email.</p>`,
    };

    await sgMail.send(sendConfig);
  } catch (error) {
    console.log("error: ", error);
  }
};

module.exports = emailVerificationSender;
