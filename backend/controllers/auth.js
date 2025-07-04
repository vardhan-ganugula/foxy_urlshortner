const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.SECRET;

async function handleCreateUser(req, res) {
  const { username, password, email } = req.body;

  try {
    const userResponse = await User.create({
      username,
      password,
      email,
    });

    return res.status(201).json({
      status: "success",
      userId: userResponse._id,
      msg: "successfully created user",
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      status: "failed",
      msg: "failed to create user, maybe user exists",
    });
  }
}

async function handleSignIn(req, res) {
  const { password, email } = req.body;
  if ((!password, !email))
    return res.json({
      status: "failed",
      msg: "email or password required",
    });

  User.findOne({
    password,
    email,
  })
    .then((data) => {
      if(!data){
        return res.json({
          status: "failed",
          msg: "authentication failed",
        })
      }
      const token = jwt.sign(
        {
          uid: data._id,
          time: Date.now(),
        },
        secret,
        { expiresIn: "1d" }
      );
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 24 * 60 * 60 * 1000, 
      });
      return res.json({
        status: "success",
        userId: data._id,
        token: token,
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(401).json({
        status: "failed",
        msg: "authentication failed",
      });
    });
}

async function handleForgotPassword(req, res) {
  const email = req.body.email;
  try {
    let result = await User.findOne({
      email,
    });

    if (result) {
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: false,
        auth: {
          user: process.env.MAIL_ADDR,
          pass: process.env.MAIL_PSWD,
        },
      });

      const token = jwt.sign(
        {
          id: result._id,
          email: result.email,
        },
        secret,
        { expiresIn: "5m" }
      );

      const resetLink = `${process.env.WEB_URL}/reset-password/${token}`;
      await transporter.sendMail({
        from: '"Coderealm.Tech 👻" <support@coderealm.tech>',
        to: email,
        subject: "Password Reset Email",
        text: "Coderealm Reset Password Request",
        html: `<b>Click the link to reset password</b><br> <br> <br> Link : <a href="${resetLink}" style="padding: 10px 15px;
        background: #ff0; color: #000; border-radius: 50vw"> Reset Password </a>`,
      });
      res.json({
        status: "success",
        msg: "email sent",
      });
    } else {
      res.json({
        status: "failed",
        msg: "email not found",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      status: "failed",
      msg: "something went wrong",
    });
  }
}

async function handleResetPassword(req, res) {
  const token = req.params.id;
  const password = req.body.password;
  try {
    let result = jwt.verify(token, secret);
    await User.findByIdAndUpdate(
      {
        _id: result.id,
      },
      {
        password,
      }
    );
    res.json({
      status: "success",
      msg: "password set successfully",
    });
  } catch (e) {
    console.log(e);
    console.log("error");
    return res.json({
      status: "failed",
      msg: "token error",
    });
  }
}
module.exports = {
  handleCreateUser,
  handleSignIn,
  handleForgotPassword,
  handleResetPassword,
};
