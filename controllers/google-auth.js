const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "472028388531-pbk8thqe6nr57vmu9hisuh85s4j1vdsd.apps.googleusercontent.com"
);

const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "472028388531-pbk8thqe6nr57vmu9hisuh85s4j1vdsd.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();

  // console.log(`User ${payload.name} verified`);

  const { sub, email, name, picture } = payload;

  const userId = sub;

  return { userId, email, fullName: name, photoUrl: picture };
};

module.exports = googleAuth;
