import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import User_schema from "../Schemas/User_schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    
    await mongoose.connect(process.env.mongo_db_url);

    const user = await User_schema.findOne({ email: Email });

    if (user) {
      return res.status(409).json({
        statusCode: 409, // Conflict - Resource already exists
        status: "failed",
        Details: "Email already exists in the database",
      });
    }

    // Hash password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newdata = new User_schema({
      name: Name,
      email: Email.toLowerCase(),
      password: hashedPassword, // Save hashed password instead of plain text
    });

    const result = await newdata.save();
    return res.status(201).json({
      statusCode: 201,
      status: "Success",
      Details: "Signup success. Please login",
    });
  } catch (error) {
    console.error("Error in Signup:", error);
    return res.status(500).json({
      statusCode: 500,
      status: "Failed",
      Details: "Internal server error occurred during signup",
      error: error.message, // Only send error message, not full error object
    });
  } finally {
    await mongoose.connection.close();
  }
};

export const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    await mongoose.connect(process.env.mongo_db_url);

    const user = await User_schema.findOne({ email: Email.toLowerCase() });

    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        status: "Failed",
        Details: "Invalid credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(Password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        statusCode: 401,
        status: "Failed",
        Details: "Invalid credentials",
      });
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    jwt.sign(
      payload,
      process.env.Secret_Auth,
      { expiresIn: "2h" },
      (error, token) => {
        if (error) {
          return res.status(500).json({
            statusCode: 500,
            status: "Failed",
            Details: "Problem with jwt",
            error: error.message,
          });
        }
        

        const serverTime = Date.now(); // Get current server time
        const expiryTime = serverTime + 2 * 60 * 60 * 1000; // 2 hours from now

        const cookieOptions = {
          httpOnly: false, // Prevent client-side access
          Secure: true, // Set to false for local development
          sameSite: "strict",
          path: "/",
        };

        // Store expiration timestamp inside the cookie
        const tokenPayload = JSON.stringify({
          token, // Your authentication token
          expiry: expiryTime, // Expiration timestamp
        });
     

        res.cookie("authToken", tokenPayload, cookieOptions);
         
        //localStorage.setItem('Is_logged_In',"true");

   
       // console.log(JSON.parse(tokenPayload))

        return res.status(200).json({
          statusCode: 200,
          status: "success",
          Details: "Login successful",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    console.error("Error in Login:", error);
    return res.status(500).json({
      statusCode: 500,
      status: "Failed",
      Details: "Internal server error occurred during login",
      error: error.message,
    });
  } finally {
    await mongoose.connection.close();
  }
};
