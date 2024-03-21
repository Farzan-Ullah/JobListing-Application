const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { name, password, email, mobile } = req.body;

    if (!name || !password || !email || !mobile) {
      return res.status(400).json({
        errorMessage: "Bad request",
      });
    }

    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      return res.status(409).json({ errorMessage: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name,
      password: hashedPassword,
      email,
      mobile,
    });
    await userData.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMessage: "Something went wrong",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        errorMessage: "Bad request! Invalid Credentials",
      });
    }

    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(401).json({ errorMessage: "User doesnt exist" });
    }

    const passwordMatch = await bcrypt.compare(password, userDetails.password);

    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: "Password is not matched" });
    }
    res.json({ message: " User logged in" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errorMessage: "Something went wrong",
    });
  }
};

module.exports = { registerUser, loginUser };