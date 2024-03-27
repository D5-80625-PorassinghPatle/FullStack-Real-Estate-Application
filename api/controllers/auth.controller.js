// Importing necessary modules and files
import User from "../models/user.model.js"; // Importing the User model
import bcryptjs from "bcryptjs"; // Importing bcryptjs for password hashing
import { errorHandler } from "../utils/error.js"; // Importing custom error handler
import jwt from "jsonwebtoken"; // Importing jsonwebtoken for creating tokens

// Function to handle user signup
export const signup = async (req, res, next) => {
  // Extracting username, email, and password from request body
  const { username, email, password } = req.body;
  // Hashing the password for security before storing it
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // Creating a new User instance with the hashed password
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // Saving the new user to the database
    await newUser.save();
    // Sending a success response if user creation is successful
    res.status(201).json("User created successfully!");
  } catch (error) {
    // If an error occurs during signup, pass it to the error handling middleware
    next(error);
  }
};

// Function to handle user signin
export const signin = async (req, res, next) => {
  // Extracting email and password from request body
  const { email, password } = req.body;
  try {
    // Finding the user by their email in the database
    const validUser = await User.findOne({ email });
    // If the user is not found, return an error
    if (!validUser) return next(errorHandler(404, "User not found!"));
    // Comparing the entered password with the hashed password stored in the database
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // If the password is invalid, return an error
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    // Generating a JWT token with the user's ID as payload
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Omitting the password field from the user object before sending the response
    const { password: pass, ...rest } = validUser._doc;
    // Setting the JWT token as a cookie in the response and sending the user data
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    // If an error occurs during signin, pass it to the error handling middleware
    next(error);
  }
};
