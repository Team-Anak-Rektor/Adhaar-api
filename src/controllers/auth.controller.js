const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require('../models');
const User = db.user;

exports.signup = async (req, res) => {
  console.log("Register .....")
  const { fullName, email } = req.body;
  let { password } = req.body
  const salt = bcrypt.genSaltSync(8);
  password = bcrypt.hashSync(password, salt);

  const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  };

  const newUser = new User({ fullName, email, password });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) {
    res.status(201).json({ 
      status: 'success',
      requestAt: Date.now(),
      message: "User was registered successfully!" 
    });
  };

};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (!userWithEmail) {
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });

  };

  const passwordIsValid = bcrypt.compareSync(
    password,
    userWithEmail.password
  );

  if (!passwordIsValid) {
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });
  };

  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  res.status(200).json({ 
    status: 'success',
      requestAt: Date.now(),
      message: "logged in successfully", token: jwtToken 
    });
};