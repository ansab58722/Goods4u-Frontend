export const validateSignupData = (req, res, next) => {
  const { Name, Email, Password } = req.body;

  if (!Name || !Email || !Password) {
    return res.status(400).json({
      statusCode: 400,
      status: "Failed",
      Details: "All fields (Name, Email, Password) are required.",
    });
  }

  // Basic email validation
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // A slightly more robust email regex
  if (!emailRegex.test(Email)) {
    return res.status(400).json({
      statusCode: 400,
      status: "Failed",
      Details: "Invalid email format.",
    });
  }

  // Password validation
  if (Password.length < 8) {
    return res.status(400).json({
      statusCode: 400,
      status: "Failed",
      Details: "Password must be at least 8 characters long.",
    });
  }

  const hasNumber = /\d/;
  if (!hasNumber.test(Password)) {
    return res.status(400).json({
      statusCode: 400,
      status: "Failed",
      Details: "Password must contain at least one number.",
    });
  }

  const hasUpperCase = /[A-Z]/;
  if (!hasUpperCase.test(Password)) {
    return res.status(400).json({
      statusCode: 400,
      status: "Failed",
      Details: "Password must contain at least one uppercase letter.",
    });
  }

  // Check for at least one special character
  const specialCharRegex = /[^A-Za-z0-9]/; // Matches anything not a letter or number
  if (!specialCharRegex.test(Password)) {
    return res.status(400).json({
      statusCode: 400,
      status: "Failed",
      Details: "Password must contain at least one special character.",
    });
  }

  // If all validations pass, proceed to the next middleware or controller
  next();
};

export const validateLoginData = (req, res, next) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({
      statusCode: 400,
      status: "Failed",
      Details: "Email and Password are required.",
    });
  }

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // A slightly more robust email regex
  if (!emailRegex.test(Email)) {

     return res.status(401).json({ 
        statusCode: 401,
        status: "Failed",
        Details: "Invalid credentials",
      });
  }

  // Password validation
  if (Password.length < 8) {
    return res.status(401).json({ 
        statusCode: 401,
        status: "Failed",
        Details: "Invalid credentials",
      });
  }

  const hasNumber = /\d/;
  if (!hasNumber.test(Password)) {
    return res.status(401).json({ 
        statusCode: 401,
        status: "Failed",
        Details: "Invalid credentials",
      });
  }

  const hasUpperCase = /[A-Z]/;
  if (!hasUpperCase.test(Password)) {
   return res.status(401).json({ 
        statusCode: 401,
        status: "Failed",
        Details: "Invalid credentials",
      });
  }

  // Check for at least one special character
  const specialCharRegex = /[^A-Za-z0-9]/; // Matches anything not a letter or number
  if (!specialCharRegex.test(Password)) {
    return res.status(401).json({ 
        statusCode: 401,
        status: "Failed",
        Details: "Invalid credentials",
      });
  }
  

  next();
}; 