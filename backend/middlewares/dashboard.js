const jwt = require("jsonwebtoken");




const secret = process.env.SECRET;


async function validateUser(req, res, next) {
  const authHeaderToken = req.headers?.authorization;
  if(!authHeaderToken){
    return res.json({
      status: "failed",
      msg: "authentication failed please login",
    });
  }
  const authToken = authHeaderToken.split(" ")[1];
  try {
    const details = jwt.verify(authToken, secret);
  } catch (e) {

    return res.json({
      status: "failed",
      msg: "authentication failed please login",
    });
  }
  next();
}


module.exports = {
    validateUser
}