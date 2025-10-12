import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { Signup, Login } from "../server/Controllers/Auth_Controller.js";
import { getAllShoes } from "../server/Controllers/Shoes_Controller.js";
import { Get_all_cloths } from "./Controllers/Cloths_controller";
import { validateSignupData, validateLoginData } from "./Middleware/Auth_Validator.js";
import { configDotenv } from "dotenv";
import { verifyToken } from "./Middleware/auth_middleware.js";

// Configure dotenv
configDotenv();

const server = express();

// Configure CORS for cross-origin cookies
const whitelist = ['https://goods4u.vercel.app','http://localhost:3000']; // Only allow frontend domain

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Request origin:', origin);
    
    // Block requests with no origin (direct browser access, API tools)
    if (!origin) {
      console.log('Blocked: No origin provided');
      return callback(new Error('Direct access not allowed'));
    }

    if (whitelist.includes(origin)) {
      console.log('Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('Origin blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
  maxAge: 86400 // 24 hours
};

// Apply CORS before other middleware
server.use(cors(corsOptions));

// Add security headers middleware
server.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://backendgoods4u.up.railway.app;");
  next();
});

// Error handling middleware for CORS
server.use((err, req, res, next) => {
  if (err.name === 'CORSError') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied: Not allowed by CORS policy'
    });
  }
  next(err);
});

// Add a middleware to check if CORS is working
server.use((req, res, next) => {
  console.log('Request headers:', req.headers);
  next();
});

server.use(bodyParser.json());
server.use(cookieParser());

server.get("/server",(req,res)=>{
    res.send("server running fine")
})

server.get("/api/shoes", getAllShoes);

server.get("/api/cloths", Get_all_cloths);

server.post("/Signup", validateSignupData, Signup);

server.post("/Login", validateLoginData, Login);

server.get("/Checkauthentication",verifyToken,(req,res)=>{
    return res.status(200).json({
        statusCode: 200,
        status: "Validated",
        Details: "User Successfully validated",
        User: req.user
    });
});

const port = process.env.server_port || 5000; // Fixed case and added fallback

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log('Environment:', process.env.mongo_db_url,"cors is applied");
});



