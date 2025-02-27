const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Ch_User = require("../models/user.schema");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const existingUser = await Ch_User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new Ch_User({ fullname, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET
    );
    res.status(201).json({ message: "Account Created Successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Ch_User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid credentials" });
    // Token generation
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    // Successful response
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const updateUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }
    const { fullname, email, password, profilepic } = req.body;
    const updatedData = { fullname, email, profilepic };
    if (password) updatedData.password = await bcrypt.hash(password, 10);
    const updatedUser = await Ch_User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getUser = async (req, res) => {
  try {
    if (!req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    const user = await Ch_User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
const deleteUser = async (req, res) => {
  try {
    if (req.user.id !== req.params.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }
    await Ch_User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin, updateUser, getUser, deleteUser };
