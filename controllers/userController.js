import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";


const helloAPI = async (req, res) => {
  res.send('Vacation Tracker APIs are running!.');
};


const registerUser = async (req, res) => {
  const { firstName, lastName, password, email, contact, dob, gender,color } = req.body;

  try {
      // List of required fields
      const requiredFields = ["firstName", "lastName", "password", "email", "contact", "dob", "gender" , "color" ];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          error: "All fields are required.", 
          missingFields 
        });
      }


      // Check Existing  Email
      let user = await userModel.findOne({ email });
      if (user) return res.status(400).json("User already exist");


    const newUser = new userModel({firstName, lastName, password, email, contact, dob, gender , color});
    const response = await newUser.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    if (!email || !password )
      return res.status(400).json("Enter Email and Password");


    const user = await userModel.findOne({ email });
  
    if (!user || !(await argon2.verify(user.password,password))) {
      return res.status(400).json("Invalid credentials");
    }
  
    // Generate access token
    const accessToken = jwt.sign(
      { email: user.email},
      "jwt-access-token-secret-key",
      { expiresIn: "50m" }
    );
  
    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
  
};


const updateUser = async (req, res) => {
  const { email } = req.body;
  const { firstName, lastName, contact, dob, gender, color } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (req.email !== email) {
    return res.status(403).json({ error: "You are not authorized to update this information" });
  }

  try {
    // Find user by email and check if it exists
    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update user fields
    Object.assign(user, { firstName, lastName, contact, dob, gender,color });

    // Save and respond
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getUserDetails = async (req, res) => {
  const email = req.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Match param and token email
  if (req.email !== email) {
    return res.status(403).json({ error: "You are not authorized to access this information" });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send User Details
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};






export {
  helloAPI,
  registerUser,
  loginUser,
  updateUser,
  getUserDetails,
};
