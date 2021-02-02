const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_ID,

  "postmessage"
);

exports.getProfileInfo = async (code) => {
  //   const r = await client.getToken(code);
  //   const idToken = r.tokens.id_token;

  const ticket = await client.verifyIdToken({
    idToken: code,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  // console.log("payload --- ", payload);
  return payload;
};
