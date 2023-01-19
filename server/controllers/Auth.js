const { User } = require("../model/models");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const bcrypt = require("bcrypt");
require("cookie-parser");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(name, email && password)) {
      res.status(400).send("Inputes are required!");
    }

    const oldUser = await User.findOne({ where: { email } });

    if (oldUser) {
      return res.status(409).send("Please SignIn!");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Enter your email and password!" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!(email && password)) {
      res.status(400).send("Inputes are required!");
    }

    if (!user) {
      res.status(400).send("Invalid email or password!");
    }

    const compare = await bcrypt.compare(password, user.password);

    if (compare) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );

      return res.json({ user, token: token });
    } else {
      return res.status(400).send("Invalid password!");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.verify = async (req, res, next) => {
  const token = await req.headers.authorization.split("Bearer ")[1];
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  const verify = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("catch err");
      if (err instanceof TokenExpiredError) {
        res.status(401).send({
          message: "Unauthorized! Access Token was expired?",
        });
        return;
      }
      res.status(401).send({ message: "Unauthorized!" });
      return;
    }
    if (decoded.exp < Math.round(new Date(Date.now()) / 1000)) {
      res.status(401).send({
        message: "Unauthorized! Access Token was expired!!!!!",
      });
      return;
    }
    req.userId = decoded.id;
    next();
  });
  return;
};

exports.isSinged = expressjwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
});
