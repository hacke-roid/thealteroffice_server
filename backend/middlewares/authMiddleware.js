const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

const verifyGoogleToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //   console.log(token);
  if (!authHeader) {
    next(createError.Unauthorized());
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  console.log(token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  console.log(ticket);
  let payload = ticket.getPayload();
  if (payload) {
    req.user = payload;
    next();
    return;
  }
  next(createError.Unauthorized());
};

module.exports = verifyGoogleToken;
