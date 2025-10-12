import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

 const cookie= req.cookies.authToken ? JSON.parse(req.cookies.authToken) : null;
  const serverTime = Date.now();



 if (!cookie) {

return res.status(400).json({
      statusCode: 400,
      status: "Not Logged in",
      Details: "Please login "
    });
  
  }

  if( serverTime > cookie.expiry){

    
   res.clearCookie('authToken')
//localStorage.clear();


return res.status(401).json({
      statusCode: 401,
      status: "Failed",
      Details: "session expired please login "
    });


  }

  
  try {

    const decoded = jwt.verify(cookie.token, process.env.Secret_Auth);
   
    req.user = decoded;

    

    next();

  } catch (err) {

    res.clearCookie('authToken')
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        statusCode: 401,
        status: "Failed",
        Details: "Token has expired"
      });
    }
    
    return res.status(401).json({
      statusCode: 401,
      status: "Failed",
      Details: "Invalid token"
    });
  }
}; 